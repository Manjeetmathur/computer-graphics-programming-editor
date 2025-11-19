import type { Shape } from '@/types/graphics'

export class GraphicsRenderer {
  private ctx: CanvasRenderingContext2D
  private width: number
  private height: number

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw new Error('Could not get 2d context')
    }
    this.ctx = ctx
    this.width = canvas.width
    this.height = canvas.height
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ctx.fillStyle = '#ffffff'
    this.ctx.fillRect(0, 0, this.width, this.height)
  }

  renderShape(shape: Shape) {
    this.ctx.strokeStyle = shape.color || '#000000'
    this.ctx.fillStyle = shape.color || '#000000'
    this.ctx.lineWidth = 1

    switch (shape.type) {
      case 'pixel':
        this.renderPixel(shape)
        break
      case 'line':
        this.renderLine(shape)
        break
      case 'rectangle':
        this.renderRectangle(shape)
        break
      case 'circle':
        this.renderCircle(shape)
        break
      case 'arc':
        this.renderArc(shape)
        break
      case 'ellipse':
        this.renderEllipse(shape)
        break
      case 'triangle':
        this.renderTriangle(shape)
        break
      case 'polygon':
        this.renderPolygon(shape)
        break
      case 'filledRectangle':
        this.renderFilledRectangle(shape)
        break
      case 'filledCircle':
        this.renderFilledCircle(shape)
        break
      case 'pieSlice':
        this.renderPieSlice(shape)
        break
    }
  }

  private renderPixel(shape: { x: number; y: number; color?: string }) {
    this.ctx.fillRect(shape.x, shape.y, 1, 1)
  }

  private renderLine(shape: { x1: number; y1: number; x2: number; y2: number }) {
    this.ctx.beginPath()
    this.ctx.moveTo(shape.x1, shape.y1)
    this.ctx.lineTo(shape.x2, shape.y2)
    this.ctx.stroke()
  }

  private renderRectangle(shape: { x1: number; y1: number; x2: number; y2: number }) {
    const width = shape.x2 - shape.x1
    const height = shape.y2 - shape.y1
    this.ctx.strokeRect(shape.x1, shape.y1, width, height)
  }

  private renderCircle(shape: { x: number; y: number; radius: number }) {
    this.ctx.beginPath()
    this.ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI)
    this.ctx.stroke()
  }

  private renderArc(shape: { x: number; y: number; radius: number; startAngle: number; endAngle: number }) {
    this.ctx.beginPath()
    const startRad = (shape.startAngle * Math.PI) / 180
    const endRad = (shape.endAngle * Math.PI) / 180
    this.ctx.arc(shape.x, shape.y, shape.radius, startRad, endRad)
    this.ctx.stroke()
  }

  private renderEllipse(shape: { x: number; y: number; radiusX: number; radiusY: number }) {
    this.ctx.beginPath()
    this.ctx.ellipse(shape.x, shape.y, shape.radiusX, shape.radiusY, 0, 0, 2 * Math.PI)
    this.ctx.stroke()
  }

  private renderTriangle(shape: { x1: number; y1: number; x2: number; y2: number; x3: number; y3: number }) {
    this.ctx.beginPath()
    this.ctx.moveTo(shape.x1, shape.y1)
    this.ctx.lineTo(shape.x2, shape.y2)
    this.ctx.lineTo(shape.x3, shape.y3)
    this.ctx.closePath()
    this.ctx.stroke()
  }

  private renderPolygon(shape: { points: Array<{ x: number; y: number }> }) {
    if (shape.points.length < 3) return
    this.ctx.beginPath()
    this.ctx.moveTo(shape.points[0].x, shape.points[0].y)
    for (let i = 1; i < shape.points.length; i++) {
      this.ctx.lineTo(shape.points[i].x, shape.points[i].y)
    }
    this.ctx.closePath()
    this.ctx.stroke()
  }

  private renderFilledRectangle(shape: { x1: number; y1: number; x2: number; y2: number; color?: string }) {
    const width = shape.x2 - shape.x1
    const height = shape.y2 - shape.y1
    this.ctx.fillRect(shape.x1, shape.y1, width, height)
  }

  private renderFilledCircle(shape: { x: number; y: number; radius: number; color?: string }) {
    this.ctx.beginPath()
    this.ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI)
    this.ctx.fill()
  }

  private renderPieSlice(shape: { x: number; y: number; radius: number; startAngle: number; endAngle: number; color?: string }) {
    this.ctx.beginPath()
    this.ctx.moveTo(shape.x, shape.y)
    const startRad = (shape.startAngle * Math.PI) / 180
    const endRad = (shape.endAngle * Math.PI) / 180
    this.ctx.arc(shape.x, shape.y, shape.radius, startRad, endRad)
    this.ctx.closePath()
    this.ctx.fill()
    this.ctx.stroke()
  }

  renderSelection(shape: Shape) {
    const bounds = this.getShapeBounds(shape)
    const padding = 4

    this.ctx.strokeStyle = '#3b82f6'
    this.ctx.lineWidth = 2
    this.ctx.setLineDash([5, 5])
    this.ctx.strokeRect(
      bounds.minX - padding,
      bounds.minY - padding,
      bounds.maxX - bounds.minX + padding * 2,
      bounds.maxY - bounds.minY + padding * 2
    )
    this.ctx.setLineDash([])

    this.renderHandles(shape, bounds)
  }

  private getShapeBounds(shape: Shape): { minX: number; minY: number; maxX: number; maxY: number } {
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
        if (shape.points.length === 0) return { minX: 0, minY: 0, maxX: 0, maxY: 0 }
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

  private renderHandles(shape: Shape, bounds: { minX: number; minY: number; maxX: number; maxY: number }) {
    const handleSize = 8
    const handles: Array<{ x: number; y: number; type: string }> = []

    switch (shape.type) {
      case 'line':
        handles.push({ x: shape.x1, y: shape.y1, type: 'point1' }, { x: shape.x2, y: shape.y2, type: 'point2' })
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
      default:
        handles.push(
          { x: bounds.minX, y: bounds.minY, type: 'corner-tl' },
          { x: bounds.maxX, y: bounds.minY, type: 'corner-tr' },
          { x: bounds.maxX, y: bounds.maxY, type: 'corner-br' },
          { x: bounds.minX, y: bounds.maxY, type: 'corner-bl' }
        )
    }

    this.ctx.fillStyle = '#3b82f6'
    this.ctx.strokeStyle = '#ffffff'
    this.ctx.lineWidth = 2

    handles.forEach((handle) => {
      this.ctx.beginPath()
      this.ctx.arc(handle.x, handle.y, handleSize / 2, 0, 2 * Math.PI)
      this.ctx.fill()
      this.ctx.stroke()
    })
  }

  renderAll(shapes: Shape[], selectedShapeId?: string) {
    this.clear()
    shapes.forEach((shape) => {
      this.renderShape(shape)
      if (selectedShapeId && shape.id === selectedShapeId) {
        this.renderSelection(shape)
      }
    })
  }
}

