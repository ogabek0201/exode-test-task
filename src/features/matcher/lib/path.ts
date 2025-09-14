export const bezierPath = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = Math.abs(x2 - x1)
  const offset = Math.max(40, Math.min(160, dx * 0.45))
  const c1x = x1 + offset
  const c1y = y1
  const c2x = x2 - offset
  const c2y = y2
  return `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`
}
