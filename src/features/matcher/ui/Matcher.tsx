import { Column, ColumnTitle, Container, Item, ItemContent, Socket } from './Matcher.styled'
import { LinesSvg } from './LinesSvg'
import { useMatcher } from '../model/useMatcher'
import type { Pair } from '@/features/matcher'

interface MatcherProps {
  leftItems: string[]
  rightItems: string[]
  pairs: Pair[]
  onPairsChange: (pairs: Pair[]) => void
}

export const Matcher = ({
  leftItems: allLeft,
  rightItems: allRight,
  pairs,
  onPairsChange,
}: MatcherProps) => {
  const {
    containerRef,
    itemRefs,
    renderLeft,
    renderRight,
    pairedLeft,
    pairedRight,
    dragging,
    hoverTarget,
    lines,
    startDrag,
    removePair,
  } = useMatcher({ leftItems: allLeft, rightItems: allRight, pairs, onPairsChange })

  return (
    <Container ref={containerRef}>
      <Column>
        <ColumnTitle>Left</ColumnTitle>
        {renderLeft.map((item) => (
          <Item
            key={`left-${item}`}
            ref={(el: HTMLDivElement | null) => {
              itemRefs.current[`left-${item}`] = el
            }}
            onPointerDown={(e: React.PointerEvent) => startDrag('left', item, e)}
            $paired={pairedLeft.includes(item)}
            $active={!!dragging && dragging.item === item && dragging.from === 'left'}
            $hover={hoverTarget?.item === item && hoverTarget?.side === 'left'}
            title={pairedLeft.includes(item) ? 'Paired' : 'Available'}
          >
            <ItemContent>{item}</ItemContent>
            <Socket
              $side="left"
              $active={
                pairedLeft.includes(item) || (dragging?.from === 'left' && dragging.item === item)
              }
            />
          </Item>
        ))}
      </Column>
      <LinesSvg lines={lines} onRemovePair={removePair} />
      <Column>
        <ColumnTitle>Right</ColumnTitle>
        {renderRight.map((item) => (
          <Item
            key={`right-${item}`}
            ref={(el: HTMLDivElement | null) => {
              itemRefs.current[`right-${item}`] = el
            }}
            onPointerDown={(e: React.PointerEvent) => startDrag('right', item, e)}
            $paired={pairedRight.includes(item)}
            $active={!!dragging && dragging.item === item && dragging.from === 'right'}
            $hover={hoverTarget?.item === item && hoverTarget?.side === 'right'}
            title={pairedRight.includes(item) ? 'Paired' : 'Available'}
          >
            <ItemContent>{item}</ItemContent>
            <Socket
              $side="right"
              $active={
                pairedRight.includes(item) || (dragging?.from === 'right' && dragging.item === item)
              }
            />
          </Item>
        ))}
      </Column>
    </Container>
  )
}
