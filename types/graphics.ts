export type ShapeType = 'pixel' | 'line' | 'rectangle' | 'circle' | 'arc' | 'ellipse' | 'triangle' | 'polygon' | 'filledRectangle' | 'filledCircle' | 'pieSlice' | 'outtext'

export interface BaseShape {
  id: string
  type: ShapeType
  color?: string
  rotation?: number // Rotation angle in degrees (0-360)
  centerX?: number // Rotation center X (optional, defaults to shape center)
  centerY?: number // Rotation center Y (optional, defaults to shape center)
}

export interface Pixel extends BaseShape {
  type: 'pixel'
  x: number
  y: number
}

export interface Line extends BaseShape {
  type: 'line'
  x1: number
  y1: number
  x2: number
  y2: number
}

export interface Rectangle extends BaseShape {
  type: 'rectangle'
  x1: number
  y1: number
  x2: number
  y2: number
}

export interface Circle extends BaseShape {
  type: 'circle'
  x: number
  y: number
  radius: number
}

export interface Arc extends BaseShape {
  type: 'arc'
  x: number
  y: number
  radius: number
  startAngle: number
  endAngle: number
}

export interface Ellipse extends BaseShape {
  type: 'ellipse'
  x: number
  y: number
  radiusX: number
  radiusY: number
}

export interface Triangle extends BaseShape {
  type: 'triangle'
  x1: number
  y1: number
  x2: number
  y2: number
  x3: number
  y3: number
}

export interface Polygon extends BaseShape {
  type: 'polygon'
  points: Array<{ x: number; y: number }>
}

export interface FilledRectangle extends BaseShape {
  type: 'filledRectangle'
  x1: number
  y1: number
  x2: number
  y2: number
}

export interface FilledCircle extends BaseShape {
  type: 'filledCircle'
  x: number
  y: number
  radius: number
}

export interface PieSlice extends BaseShape {
  type: 'pieSlice'
  x: number
  y: number
  radius: number
  startAngle: number
  endAngle: number
}

export interface OutText extends BaseShape {
  type: 'outtext'
  x: number
  y: number
  text: string
}

export type Shape = Pixel | Line | Rectangle | Circle | Arc | Ellipse | Triangle | Polygon | FilledRectangle | FilledCircle | PieSlice | OutText

