import type { Shape } from '@/types/graphics'

export function roundShapeCoordinates(shape: Shape): Shape {
  const rounded = { ...shape } as Shape

  switch (rounded.type) {
    case 'pixel': {
      const pixel = rounded as Extract<Shape, { type: 'pixel' }>
      pixel.x = Math.round(pixel.x)
      pixel.y = Math.round(pixel.y)
      break
    }

    case 'line': {
      const line = rounded as Extract<Shape, { type: 'line' }>
      line.x1 = Math.round(line.x1)
      line.y1 = Math.round(line.y1)
      line.x2 = Math.round(line.x2)
      line.y2 = Math.round(line.y2)
      break
    }

    case 'rectangle':
    case 'filledRectangle': {
      const rect = rounded as Extract<Shape, { type: 'rectangle' | 'filledRectangle' }>
      rect.x1 = Math.round(rect.x1)
      rect.y1 = Math.round(rect.y1)
      rect.x2 = Math.round(rect.x2)
      rect.y2 = Math.round(rect.y2)
      break
    }

    case 'circle':
    case 'filledCircle': {
      const circle = rounded as Extract<Shape, { type: 'circle' | 'filledCircle' }>
      circle.x = Math.round(circle.x)
      circle.y = Math.round(circle.y)
      circle.radius = Math.round(circle.radius)
      break
    }

    case 'arc':
    case 'pieSlice': {
      const arc = rounded as Extract<Shape, { type: 'arc' | 'pieSlice' }>
      arc.x = Math.round(arc.x)
      arc.y = Math.round(arc.y)
      arc.radius = Math.round(arc.radius)
      arc.startAngle = Math.round(arc.startAngle)
      arc.endAngle = Math.round(arc.endAngle)
      break
    }

    case 'ellipse': {
      const ellipse = rounded as Extract<Shape, { type: 'ellipse' }>
      ellipse.x = Math.round(ellipse.x)
      ellipse.y = Math.round(ellipse.y)
      ellipse.radiusX = Math.round(ellipse.radiusX)
      ellipse.radiusY = Math.round(ellipse.radiusY)
      break
    }

    case 'triangle': {
      const triangle = rounded as Extract<Shape, { type: 'triangle' }>
      triangle.x1 = Math.round(triangle.x1)
      triangle.y1 = Math.round(triangle.y1)
      triangle.x2 = Math.round(triangle.x2)
      triangle.y2 = Math.round(triangle.y2)
      triangle.x3 = Math.round(triangle.x3)
      triangle.y3 = Math.round(triangle.y3)
      break
    }

    case 'polygon': {
      const polygon = rounded as Extract<Shape, { type: 'polygon' }>
      polygon.points = polygon.points.map((p) => ({
        x: Math.round(p.x),
        y: Math.round(p.y),
      }))
      break
    }
  }

  return rounded
}

