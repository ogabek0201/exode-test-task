import type { Pair } from '../types'

export const getPairedLeft = (pairs: Pair[]) => pairs.map((p) => p.left)
export const getPairedRight = (pairs: Pair[]) => pairs.map((p) => p.right)

export const getAvailable = (all: string[], paired: string[]) =>
  all.filter((i) => !paired.includes(i))

export const getRenderOrder = (all: string[], pairs: Pair[], side: 'left' | 'right') => {
  const paired = side === 'left' ? getPairedLeft(pairs) : getPairedRight(pairs)
  const available = getAvailable(all, paired)
  return [...paired, ...available]
}
