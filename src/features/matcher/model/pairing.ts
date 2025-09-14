import type { Pair } from '@/features/matcher'

export const isLeftPaired = (pairs: Pair[], left: string) => pairs.some((p) => p.left === left)
export const isRightPaired = (pairs: Pair[], right: string) => pairs.some((p) => p.right === right)

export const canPair = (pairs: Pair[], left: string, right: string) => {
  if (left === right) return false
  if (isLeftPaired(pairs, left)) return false
  return !isRightPaired(pairs, right);

}

export const addPair = (pairs: Pair[], pair: Pair) => [...pairs, pair]
export const removePair = (pairs: Pair[], toRemove: Pair) => pairs.filter((p) => p !== toRemove)
