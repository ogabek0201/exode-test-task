import type { DragState, Line, Pair, Point } from '@/features/matcher/types.ts'

type GetCoords = (side: 'left' | 'right', item: string) => Point

export const computeLines = (
  pairs: Pair[],
  dragging: DragState | null,
  getCoords: GetCoords,
): Line[] => {
  const next: Line[] = pairs.map((pair) => {
    const start = getCoords('left', pair.left)
    const end = getCoords('right', pair.right)
    return { start, end, pair }
  })
  if (dragging) {
    const start = getCoords(dragging.from, dragging.item)
    next.push({ start, end: { x: dragging.endX, y: dragging.endY }, pair: null })
  }
  return next
}

