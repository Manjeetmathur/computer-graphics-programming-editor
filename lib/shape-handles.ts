import type { Shape } from '@/types/graphics'
import { getShapeBounds } from './shape-hit-detection'

export interface Handle {
  x: number
  y: number
  type: string
}

export function getShapeCenter(shape: Shape): { x: number; y: number } {
  const bounds = getShapeBounds(shape)
  return {
    x: (bounds.minX + bounds.maxX) / 2,
    y: (bounds.minY + bounds.maxY) / 2,
  }
}

export function getShapeHandles(shape: Shape): Handle[] {
  const bounds = getShapeBounds(shape)
  const handles: Handle[] = []

  switch (shape.type) {
    case 'line':
      handles.push(
        { x: shape.x1, y: shape.y1, type: 'point1' },
        { x: shape.x2, y: shape.y2, type: 'point2' }
      )
      break

    case 'rectangle':
    case 'filledRectangle':
      handles.push(
        { x: bounds.minX, y: bounds.minY, type: 'corner-tl' },
        { x: bounds.maxX, y: bounds.minY, type: 'corner-tr' },
        { x: bounds.maxX, y: bounds.maxY, type: 'corner-br' },
        { x: bounds.minX, y: bounds.maxY, type: 'corner-bl' }
      )
      break

    case 'circle':
    case 'filledCircle':
      handles.push(
        { x: shape.x, y: shape.y - shape.radius, type: 'top' },
        { x: shape.x + shape.radius, y: shape.y, type: 'right' },
        { x: shape.x, y: shape.y + shape.radius, type: 'bottom' },
        { x: shape.x - shape.radius, y: shape.y, type: 'left' }
      )
      break

    case 'arc':
    case 'pieSlice':
      handles.push(
        { x: shape.x, y: shape.y - shape.radius, type: 'radius-top' },
        { x: shape.x + shape.radius, y: shape.y, type: 'radius-right' },
        { x: shape.x, y: shape.y + shape.radius, type: 'radius-bottom' },
        { x: shape.x - shape.radius, y: shape.y, type: 'radius-left' }
      )
      break

    case 'ellipse':
      handles.push(
        { x: shape.x, y: shape.y - shape.radiusY, type: 'top' },
        { x: shape.x + shape.radiusX, y: shape.y, type: 'right' },
        { x: shape.x, y: shape.y + shape.radiusY, type: 'bottom' },
        { x: shape.x - shape.radiusX, y: shape.y, type: 'left' }
      )
      break

    case 'triangle':
      handles.push(
        { x: shape.x1, y: shape.y1, type: 'point1' },
        { x: shape.x2, y: shape.y2, type: 'point2' },
        { x: shape.x3, y: shape.y3, type: 'point3' }
      )
      break

    case 'pixel':
      handles.push({ x: shape.x, y: shape.y, type: 'center' })
      break

    case 'polygon':
      shape.points.forEach((point, index) => {
        handles.push({ x: point.x, y: point.y, type: `point-${index}` })
      })
      break
  }

  return handles
}

export function findHandleAtPoint(x: number, y: number, handles: Handle[], tolerance = 10): Handle | null {
  for (const handle of handles) {
    const dist = Math.sqrt((x - handle.x) ** 2 + (y - handle.y) ** 2)
    if (dist <= tolerance) {
      return handle
    }
  }
  return null
}

export function resizeShape(shape: Shape, handleType: string, newX: number, newY: number): Shape {
  const updated = { ...shape } as Shape

  switch (updated.type) {
    case 'line': {
      const line = updated as Extract<Shape, { type: 'line' }>
      if (handleType === 'point1') {
        line.x1 = newX
        line.y1 = newY
      } else if (handleType === 'point2') {
        line.x2 = newX
        line.y2 = newY
      }
      break
    }

    case 'rectangle':
    case 'filledRectangle': {
      const rect = updated as Extract<Shape, { type: 'rectangle' | 'filledRectangle' }>
      if (handleType === 'corner-tl') {
        rect.x1 = newX
        rect.y1 = newY
      } else if (handleType === 'corner-tr') {
        rect.x2 = newX
        rect.y1 = newY
      } else if (handleType === 'corner-br') {
        rect.x2 = newX
        rect.y2 = newY
      } else if (handleType === 'corner-bl') {
        rect.x1 = newX
        rect.y2 = newY
      }
      break
    }

    case 'circle':
    case 'filledCircle': {
      const circle = updated as Extract<Shape, { type: 'circle' | 'filledCircle' }>
      const dist = Math.sqrt((newX - circle.x) ** 2 + (newY - circle.y) ** 2)
      circle.radius = Math.max(1, dist)
      break
    }

    case 'arc':
    case 'pieSlice': {
      const arc = updated as Extract<Shape, { type: 'arc' | 'pieSlice' }>
      const radiusDist = Math.sqrt((newX - arc.x) ** 2 + (newY - arc.y) ** 2)
      arc.radius = Math.max(1, radiusDist)
      break
    }

    case 'ellipse': {
      const ellipse = updated as Extract<Shape, { type: 'ellipse' }>
      if (handleType === 'top' || handleType === 'bottom') {
        const distY = Math.abs(newY - ellipse.y)
        ellipse.radiusY = Math.max(1, distY)
      } else if (handleType === 'left' || handleType === 'right') {
        const distX = Math.abs(newX - ellipse.x)
        ellipse.radiusX = Math.max(1, distX)
      }
      break
    }

    case 'triangle': {
      const triangle = updated as Extract<Shape, { type: 'triangle' }>
      if (handleType === 'point1') {
        triangle.x1 = newX
        triangle.y1 = newY
      } else if (handleType === 'point2') {
        triangle.x2 = newX
        triangle.y2 = newY
      } else if (handleType === 'point3') {
        triangle.x3 = newX
        triangle.y3 = newY
      }
      break
    }

    case 'polygon': {
      const polygon = updated as Extract<Shape, { type: 'polygon' }>
      const pointIndex = parseInt(handleType.split('-')[1])
      if (!isNaN(pointIndex) && pointIndex >= 0 && pointIndex < polygon.points.length) {
        polygon.points[pointIndex] = { x: newX, y: newY }
      }
      break
    }

    case 'pixel': {
      const pixel = updated as Extract<Shape, { type: 'pixel' }>
      pixel.x = newX
      pixel.y = newY
      break
    }
  }

  return updated
}


