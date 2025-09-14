import type { Point } from '../types'

export const getItemCoords = (
  container: HTMLDivElement | null,
  el: HTMLElement | null,
  side: 'left' | 'right',
): Point => {
  if (!container || !el) return { x: 0, y: 0 }
  const containerRect = container.getBoundingClientRect()
  const rect = el.getBoundingClientRect()
  const x = side === 'left' ? rect.right - containerRect.left : rect.left - containerRect.left
  const y = rect.top + rect.height / 2 - containerRect.top
  return { x, y }
}
