import type { Line, Pair } from '../types'
import { Svg, PathSolid, PathDashed, Endpoint } from './Matcher.styled'
import { bezierPath } from '../lib/path'

interface LinesSvgProps {
  lines: Line[]
  onRemovePair: (pair: Pair) => void
}

export const LinesSvg = ({ lines, onRemovePair }: LinesSvgProps) => {
  return (
    <Svg>
      {lines.map((l, i) => {
        const isTemp = !l.pair
        const d = bezierPath(l.start.x, l.start.y, l.end.x, l.end.y)
        return (
          <g key={i}>
            {isTemp ? (
              <PathDashed d={d} />
            ) : (
              <PathSolid d={d} onClick={() => l.pair && onRemovePair(l.pair)} />
            )}
            <Endpoint cx={l.start.x} cy={l.start.y} />
            <Endpoint cx={l.end.x} cy={l.end.y} />
          </g>
        )
      })}
    </Svg>
  )
}
