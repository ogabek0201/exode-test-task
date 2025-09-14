import { loadJSON, removeItem, saveJSON } from '@/shared/lib/storage'
import type { Pair } from '@/features/matcher'

export const STORAGE_KEY = 'matcherPairs'

export const savePairs = (pairs: Pair[]) => saveJSON<Pair[]>(STORAGE_KEY, pairs)
export const loadPairs = (): Pair[] => loadJSON<Pair[]>(STORAGE_KEY) ?? []
export const clearPairs = () => removeItem(STORAGE_KEY)
