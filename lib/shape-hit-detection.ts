import type { Shape } from '@/types/graphics'

export function isPointInShape(x: number, y: number, shape: Shape, tolerance = 5): boolean {
  switch (shape.type) {
    case 'pixel':
      return Math.abs(shape.x - x) <= tolerance && Math.abs(shape.y - y) <= tolerance

    case 'line':
      const distToLine = distanceToLineSegment(x, y, shape.x1, shape.y1, shape.x2, shape.y2)
      return distToLine <= tolerance

    case 'rectangle':
    case 'filledRectangle':
      const minX = Math.min(shape.x1, shape.x2)
      const maxX = Math.max(shape.x1, shape.x2)
      const minY = Math.min(shape.y1, shape.y2)
      const maxY = Math.max(shape.y1, shape.y2)
      return x >= minX - tolerance && x <= maxX + tolerance && y >= minY - tolerance && y <= maxY + tolerance

    case 'circle':
    case 'filledCircle':
      const dist = Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2)
      return Math.abs(dist - shape.radius) <= tolerance

    case 'arc':
    case 'pieSlice':
      const distToCenter = Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2)
      if (distToCenter > shape.radius + tolerance) return false
      if (distToCenter < shape.radius - tolerance && shape.type === 'pieSlice') return true
      const angle = (Math.atan2(y - shape.y, x - shape.x) * 180) / Math.PI
      const normalizedAngle = angle < 0 ? angle + 360 : angle
      return normalizedAngle >= shape.startAngle && normalizedAngle <= shape.endAngle

    case 'ellipse':
      const dx = (x - shape.x) / shape.radiusX
      const dy = (y - shape.y) / shape.radiusY
      const distEllipse = Math.sqrt(dx * dx + dy * dy)
      return Math.abs(distEllipse - 1) * Math.min(shape.radiusX, shape.radiusY) <= tolerance

    case 'triangle':
      return isPointInTriangle(x, y, shape.x1, shape.y1, shape.x2, shape.y2, shape.x3, shape.y3, tolerance)

    case 'polygon':
      return isPointInPolygon(x, y, shape.points, tolerance)

    default:
      return false
  }
}

function distanceToLineSegment(px: number, py: number, x1: number, y1: number, x2: number, y2: number): number {
  const A = px - x1
  const B = py - y1
  const C = x2 - x1
  const D = y2 - y1

  const dot = A * C + B * D
  const lenSq = C * C + D * D
  let param = -1
  if (lenSq !== 0) param = dot / lenSq

  let xx: number, yy: number

  if (param < 0) {
    xx = x1
    yy = y1
  } else if (param > 1) {
    xx = x2
    yy = y2
  } else {
    xx = x1 + param * C
    yy = y1 + param * D
  }

  const dx = px - xx
  const dy = py - yy
  return Math.sqrt(dx * dx + dy * dy)
}

function isPointInTriangle(px: number, py: number, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, tolerance: number): boolean {
  const d1 = sign(px, py, x1, y1, x2, y2)
  const d2 = sign(px, py, x2, y2, x3, y3)
  const d3 = sign(px, py, x3, y3, x1, y1)

  const hasNeg = d1 < 0 || d2 < 0 || d3 < 0
  const hasPos = d1 > 0 || d2 > 0 || d3 > 0

  if (!hasNeg || !hasPos) return true

  const dist1 = distanceToLineSegment(px, py, x1, y1, x2, y2)
  const dist2 = distanceToLineSegment(px, py, x2, y2, x3, y3)
  const dist3 = distanceToLineSegment(px, py, x3, y3, x1, y1)

  return Math.min(dist1, dist2, dist3) <= tolerance
}

function sign(px: number, py: number, x1: number, y1: number, x2: number, y2: number): number {
  return (px - x2) * (y1 - y2) - (x1 - x2) * (py - y2)
}

function isPointInPolygon(x: number, y: number, points: Array<{ x: number; y: number }>, tolerance: number): boolean {
  if (points.length < 3) return false

  let inside = false
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const xi = points[i].x
    const yi = points[i].y
    const xj = points[j].x
    const yj = points[j].y

    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
    if (intersect) inside = !inside
  }

  if (inside) return true

  for (let i = 0; i < points.length; i++) {
    const next = (i + 1) % points.length
    const dist = distanceToLineSegment(x, y, points[i].x, points[i].y, points[next].x, points[next].y)
    if (dist <= tolerance) return true
  }

  return false
}

export function getShapeBounds(shape: Shape): { minX: number; minY: number; maxX: number; maxY: number } {
  switch (shape.type) {
    case 'pixel':
      return { minX: shape.x, minY: shape.y, maxX: shape.x, maxY: shape.y }

    case 'line':
      return {
        minX: Math.min(shape.x1, shape.x2),
        minY: Math.min(shape.y1, shape.y2),
        maxX: Math.max(shape.x1, shape.x2),
        maxY: Math.max(shape.y1, shape.y2),
      }

    case 'rectangle':
    case 'filledRectangle':
      return {
        minX: Math.min(shape.x1, shape.x2),
        minY: Math.min(shape.y1, shape.y2),
        maxX: Math.max(shape.x1, shape.x2),
        maxY: Math.max(shape.y1, shape.y2),
      }

    case 'circle':
    case 'filledCircle':
      return {
        minX: shape.x - shape.radius,
        minY: shape.y - shape.radius,
        maxX: shape.x + shape.radius,
        maxY: shape.y + shape.radius,
      }

    case 'arc':
    case 'pieSlice':
      return {
        minX: shape.x - shape.radius,
        minY: shape.y - shape.radius,
        maxX: shape.x + shape.radius,
        maxY: shape.y + shape.radius,
      }

    case 'ellipse':
      return {
        minX: shape.x - shape.radiusX,
        minY: shape.y - shape.radiusY,
        maxX: shape.x + shape.radiusX,
        maxY: shape.y + shape.radiusY,
      }

    case 'triangle':
      return {
        minX: Math.min(shape.x1, shape.x2, shape.x3),
        minY: Math.min(shape.y1, shape.y2, shape.y3),
        maxX: Math.max(shape.x1, shape.x2, shape.x3),
        maxY: Math.max(shape.y1, shape.y2, shape.y3),
      }

    case 'polygon':
      if (shape.points.length === 0) {
        return { minX: 0, minY: 0, maxX: 0, maxY: 0 }
      }
      const xs = shape.points.map((p) => p.x)
      const ys = shape.points.map((p) => p.y)
      return {
        minX: Math.min(...xs),
        minY: Math.min(...ys),
        maxX: Math.max(...xs),
        maxY: Math.max(...ys),
      }

    default:
      return { minX: 0, minY: 0, maxX: 0, maxY: 0 }
  }
}

