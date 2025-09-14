import { Matcher } from '@/features/matcher'
import {
  Actions,
  Button,
  Card,
  ChipIndex,
  ChipRemove,
  ChipText,
  EmptyHint,
  PairChip,
  PairsBar,
} from './MatcherPanel.styled'
import { useMatcherPanel } from '../model/useMatcherPanel'

interface MatcherPanelProps {
  leftItems: string[]
  rightItems: string[]
}

export const MatcherPanel = ({ leftItems, rightItems }: MatcherPanelProps) => {
  const { pairs, setPairs, save, load, clear, removePair } = useMatcherPanel()

  return (
    <Card>
      <Actions>
        <Button $variant="primary" onClick={save} aria-label="Save pairs">
          Save
        </Button>
        <Button onClick={load} aria-label="Load saved pairs">
          Load
        </Button>
        <Button $variant="danger" onClick={clear} aria-label="Clear saved pairs">
          Clear
        </Button>
      </Actions>

      <PairsBar>
        {pairs.length === 0 ? (
          <EmptyHint>No pairs yet — try dragging an item.</EmptyHint>
        ) : (
          pairs.map((p, idx) => (
            <PairChip key={`${p.left}-${p.right}`}>
              <ChipIndex>{idx + 1}</ChipIndex>
              <ChipText>
                {p.left} <span aria-hidden>—</span> {p.right}
              </ChipText>
              <ChipRemove
                onClick={() => removePair(p)}
                title="Remove pair"
                aria-label={`Remove pair ${p.left} to ${p.right}`}
              >
                ×
              </ChipRemove>
            </PairChip>
          ))
        )}
      </PairsBar>

      <Matcher
        leftItems={leftItems}
        rightItems={rightItems}
        pairs={pairs}
        onPairsChange={setPairs}
      />
    </Card>
  )
}
