import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import type { DragState, Line, Pair } from '../types'
import { getItemCoords } from '../lib/coords'
import {
  canPair as canPairHelper,
  removePair as removePairHelper,
  addPair as addPairHelper,
} from './pairing'
import { getPairedLeft, getPairedRight, getAvailable, getRenderOrder } from './selectors'
import { hitTestItems } from '../lib/hit'
import { computeLines } from '../lib/lines'

interface Params {
  leftItems: string[]
  rightItems: string[]
  pairs: Pair[]
  onPairsChange: (pairs: Pair[]) => void
}

export const useMatcher = ({ leftItems, rightItems, pairs, onPairsChange }: Params) => {
  const [dragging, setDragging] = useState<DragState | null>(null)
  const [hoverTarget, setHoverTarget] = useState<{ side: 'left' | 'right'; item: string } | null>(
    null,
  )
  const [lines, setLines] = useState<Line[]>([])

  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const rafIdRef = useRef<number | null>(null)
  const nextXYRef = useRef<{ x: number; y: number } | null>(null)
  const nextClientRef = useRef<{ x: number; y: number } | null>(null)

  const pairedLeft = getPairedLeft(pairs)
  const pairedRight = getPairedRight(pairs)
  const availableLeft = getAvailable(leftItems, pairedLeft)
  const availableRight = getAvailable(rightItems, pairedRight)
  const renderLeft = getRenderOrder(leftItems, pairs, 'left')
  const renderRight = getRenderOrder(rightItems, pairs, 'right')

  const startDrag = (side: 'left' | 'right', item: string, e: ReactPointerEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    const itemRect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    if (!rect) return
    const startX = side === 'left' ? itemRect.right - rect.left : itemRect.left - rect.left
    const startY = itemRect.top + itemRect.height / 2 - rect.top
    setDragging({ from: side, item, endX: startX, endY: startY })
    e.preventDefault()
    e.stopPropagation()
  }

  const removePair = (pair: Pair) => {
    onPairsChange(removePairHelper(pairs, pair))
  }

  const getCoords = (side: 'left' | 'right', item: string) => {
    const key = `${side}-${item}`
    const el = itemRefs.current[key]
    return getItemCoords(containerRef.current, el as HTMLElement | null, side)
  }

  // Measure lines after DOM updates to avoid stale positions
  useLayoutEffect(() => {
    setLines(computeLines(pairs, dragging, getCoords))
  }, [pairs, dragging])

  // Keep lines in sync on window resize
  useEffect(() => {
    const onResize = () => setLines(computeLines(pairs, dragging, getCoords))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [pairs, dragging])

  // Hit-testing helper using lib
  const findHitTarget = (side: 'left' | 'right', clientX: number, clientY: number) => {
    const renderItems = side === 'left' ? renderLeft : renderRight
    return hitTestItems(side, renderItems, itemRefs.current, clientX, clientY, 6)
  }

  // Pointer events: dragging and release pairing
  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!dragging) return
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      nextXYRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      nextClientRef.current = { x: e.clientX, y: e.clientY }
      if (rafIdRef.current == null) {
        rafIdRef.current = requestAnimationFrame(() => {
          if (dragging && nextXYRef.current) {
            setDragging({ ...dragging, endX: nextXYRef.current.x, endY: nextXYRef.current.y })
            const client = nextClientRef.current
            if (client) {
              const opp: 'left' | 'right' = dragging.from === 'left' ? 'right' : 'left'
              const hit = findHitTarget(opp, client.x, client.y)
              setHoverTarget(hit)
            }
          }
          rafIdRef.current = null
        })
      }
    }
    const up = () => {
      if (dragging && hoverTarget) {
        const l = hoverTarget.side === 'left' ? hoverTarget.item : dragging.item
        const r = hoverTarget.side === 'right' ? hoverTarget.item : dragging.item
        if (canPairHelper(pairs, l, r)) {
          onPairsChange(addPairHelper(pairs, { left: l, right: r }))
        }
      }
      setDragging(null)
      setHoverTarget(null)
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
      nextXYRef.current = null
      nextClientRef.current = null
    }
    if (dragging) {
      window.addEventListener('pointermove', move, { passive: true })
      window.addEventListener('pointerup', up)
      window.addEventListener('pointercancel', up)
    }
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
    }
  }, [dragging, hoverTarget, pairs, renderLeft, renderRight])

  return {
    // refs
    containerRef,
    itemRefs,
    // derived
    renderLeft,
    renderRight,
    pairedLeft,
    pairedRight,
    availableLeft,
    availableRight,
    // state
    dragging,
    hoverTarget,
    lines,
    // actions
    startDrag,
    removePair,
  }
}
