export interface Pair {
  left: string
  right: string
}

export type Side = 'left' | 'right'

export type Point = { x: number; y: number }

export interface Line {
  start: Point
  end: Point
  pair: Pair | null
}

export interface DragState {
  from: Side
  item: string
  endX: number
  endY: number
}
