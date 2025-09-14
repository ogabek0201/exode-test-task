export const hitTestItems = (
  side: 'left' | 'right',
  renderItems: string[],
  itemRefs: Record<string, HTMLDivElement | null>,
  clientX: number,
  clientY: number,
  pad = 6,
) => {
  for (const item of renderItems) {
    const key = `${side}-${item}`
    const el = itemRefs[key]
    if (!el) continue
    const rect = el.getBoundingClientRect()
    if (
      clientX >= rect.left - pad &&
      clientX <= rect.right + pad &&
      clientY >= rect.top - pad &&
      clientY <= rect.bottom + pad
    ) {
      return { side, item }
    }
  }
  return null as { side: 'left' | 'right'; item: string } | null
}
