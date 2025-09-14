import { useCallback, useEffect, useState } from 'react'
import { removePair as removePairHelper } from '@/features/matcher/model/pairing'
import {
  clearPairs as storageClear,
  loadPairs as storageLoad,
  savePairs as storageSave,
} from '@/widgets/matcherPanel/model/pairsStorage'
import type { Pair } from '@/features/matcher'

export const useMatcherPanel = () => {
  const [pairs, setPairs] = useState<Pair[]>([])

  useEffect(() => {
    setPairs(storageLoad())
  }, [])

  const save = useCallback(() => storageSave(pairs), [pairs])
  const load = useCallback(() => setPairs(storageLoad()), [])
  const clear = useCallback(() => {
    storageClear()
    setPairs([])
  }, [])

  const removePair = useCallback((toRemove: Pair) => {
    setPairs((prev) => removePairHelper(prev, toRemove))
  }, [])

  return { pairs, setPairs, save, load, clear, removePair }
}
