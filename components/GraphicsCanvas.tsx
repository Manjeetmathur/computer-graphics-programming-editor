'use client'

import { useEffect, useRef, useState } from 'react'
import type { Shape } from '@/types/graphics'
import { GraphicsRenderer } from '@/lib/graphics-renderer'
import { isPointInShape, getShapeBounds } from '@/lib/shape-hit-detection'
import { getShapeHandles, findHandleAtPoint, resizeShape, type Handle } from '@/lib/shape-handles'

interface GraphicsCanvasProps {
  shapes: Shape[]
  selectedShapeId: string | null
  onSelectShape: (shape: Shape) => void
  onUpdateShape: (shape: Shape) => void
}

export default function GraphicsCanvas({ shapes, selectedShapeId, onSelectShape, onUpdateShape }: GraphicsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<GraphicsRenderer | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null)
  const [draggedShape, setDraggedShape] = useState<Shape | null>(null)
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(null)
  const [resizeHandle, setResizeHandle] = useState<Handle | null>(null)
  const [hoveredHandle, setHoveredHandle] = useState<Handle | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const updateCanvasSize = () => {
      if (!canvasRef.current) return
      
      const maxWidth = Math.min(window.innerWidth - 32, 800)
      const maxHeight = Math.min(window.innerHeight - 200, 600)
      const size = Math.min(maxWidth, maxHeight, 600)

      canvasRef.current.width = size
      canvasRef.current.height = size

      if (!rendererRef.current) {
        rendererRef.current = new GraphicsRenderer(canvasRef.current)
      }

      rendererRef.current.renderAll(shapes, selectedShapeId || undefined)
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)
    return () => window.removeEventListener('resize', updateCanvasSize)
  }, [shapes, selectedShapeId])

  const getCanvasPoint = (e: MouseEvent | TouchEvent): { x: number; y: number } | null => {
    if (!canvasRef.current) return null
    const rect = canvasRef.current.getBoundingClientRect()
    const scaleX = canvasRef.current.width / rect.width
    const scaleY = canvasRef.current.height / rect.height

    let clientX: number, clientY: number
    if ('touches' in e) {
      if (e.touches.length === 0) return null
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    }
  }

  const findShapeAtPoint = (x: number, y: number): Shape | null => {
    for (let i = shapes.length - 1; i >= 0; i--) {
      if (isPointInShape(x, y, shapes[i], 8)) {
        return shapes[i]
      }
    }
    return null
  }

  const handleStart = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const point = getCanvasPoint(e.nativeEvent)
    if (!point) return

    // First check if clicking on a handle (resize)
    const selectedShape = shapes.find((s) => s.id === selectedShapeId)
    if (selectedShape) {
      const handles = getShapeHandles(selectedShape)
      const handle = findHandleAtPoint(point.x, point.y, handles, 12)
      if (handle) {
        setIsResizing(true)
        setDraggedShape(selectedShape)
        setResizeHandle(handle)
        setDragStart(point)
        return
      }
    }

    // Otherwise check if clicking on a shape (move)
    const shape = findShapeAtPoint(point.x, point.y)
    if (shape) {
      setIsDragging(true)
      setDraggedShape(shape)
      const bounds = getShapeBounds(shape)
      const centerX = (bounds.minX + bounds.maxX) / 2
      const centerY = (bounds.minY + bounds.maxY) / 2
      setDragOffset({ x: point.x - centerX, y: point.y - centerY })
      setDragStart(point)
      onSelectShape(shape)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const point = getCanvasPoint(e.nativeEvent)
    if (!point) return

    // Update cursor based on hover
    if (!isDragging && !isResizing) {
      const selectedShape = shapes.find((s) => s.id === selectedShapeId)
      if (selectedShape) {
        const handles = getShapeHandles(selectedShape)
        const handle = findHandleAtPoint(point.x, point.y, handles, 12)
        if (handle) {
          setHoveredHandle(handle)
          if (canvasRef.current) {
            canvasRef.current.style.cursor = getResizeCursor(handle.type)
          }
          return
        }
      }
      setHoveredHandle(null)
      if (canvasRef.current) {
        const shape = findShapeAtPoint(point.x, point.y)
        canvasRef.current.style.cursor = shape ? 'move' : 'default'
      }
    }
  }

  const handleMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const point = getCanvasPoint(e.nativeEvent)
    if (!point) return

    // Handle resizing
    if (isResizing && draggedShape && resizeHandle) {
      const updated = resizeShape(draggedShape, resizeHandle.type, point.x, point.y)
      onUpdateShape(updated)
      setDraggedShape(updated)
      return
    }

    // Handle moving
    if (!isDragging || !draggedShape || !dragOffset) return

    const newCenterX = point.x - dragOffset.x
    const newCenterY = point.y - dragOffset.y
    const bounds = getShapeBounds(draggedShape)
    const oldCenterX = (bounds.minX + bounds.maxX) / 2
    const oldCenterY = (bounds.minY + bounds.maxY) / 2
    const deltaX = newCenterX - oldCenterX
    const deltaY = newCenterY - oldCenterY

    const updated = { ...draggedShape } as Shape

    switch (updated.type) {
      case 'pixel':
        updated.x += deltaX
        updated.y += deltaY
        break
      case 'line':
        updated.x1 += deltaX
        updated.y1 += deltaY
        updated.x2 += deltaX
        updated.y2 += deltaY
        break
      case 'rectangle':
      case 'filledRectangle':
        updated.x1 += deltaX
        updated.y1 += deltaY
        updated.x2 += deltaX
        updated.y2 += deltaY
        break
      case 'circle':
      case 'filledCircle':
        updated.x += deltaX
        updated.y += deltaY
        break
      case 'arc':
      case 'pieSlice':
        updated.x += deltaX
        updated.y += deltaY
        break
      case 'ellipse':
        updated.x += deltaX
        updated.y += deltaY
        break
      case 'triangle':
        updated.x1 += deltaX
        updated.y1 += deltaY
        updated.x2 += deltaX
        updated.y2 += deltaY
        updated.x3 += deltaX
        updated.y3 += deltaY
        break
      case 'polygon':
        updated.points = updated.points.map((p) => ({ x: p.x + deltaX, y: p.y + deltaY }))
        break
    }

    onUpdateShape(updated)
    setDraggedShape(updated)
  }

  const handleEnd = () => {
    setIsDragging(false)
    setIsResizing(false)
    setDraggedShape(null)
    setDragOffset(null)
    setDragStart(null)
    setResizeHandle(null)
    setHoveredHandle(null)
  }

  const getResizeCursor = (handleType: string): string => {
    if (handleType.includes('corner-tl') || handleType.includes('corner-br')) return 'nwse-resize'
    if (handleType.includes('corner-tr') || handleType.includes('corner-bl')) return 'nesw-resize'
    if (handleType.includes('top') || handleType.includes('bottom')) return 'ns-resize'
    if (handleType.includes('left') || handleType.includes('right')) return 'ew-resize'
    if (handleType.includes('radius-')) return 'ns-resize'
    return 'move'
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-2 sm:p-4 overflow-auto">
      <h2 className="text-base sm:text-xl font-semibold mb-2 sm:mb-4 text-gray-700">Graphics Renderer</h2>
      <div className="border-2 border-gray-300 bg-white shadow-lg max-w-full">
        <canvas
          ref={canvasRef}
          width={320}
          height={320}
          className="display-block w-full h-auto max-w-full cursor-pointer"
          style={{ maxWidth: '100%', height: 'auto', touchAction: 'none' }}
          onMouseDown={handleStart}
          onMouseMove={(e) => {
            handleMouseMove(e)
            handleMove(e)
          }}
          onMouseUp={handleEnd}
          onMouseLeave={(e) => {
            handleEnd()
            if (canvasRef.current) {
              canvasRef.current.style.cursor = 'default'
            }
          }}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        />
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center px-4">
        Click to select • Drag to move • Drag handles to resize
      </p>
    </div>
  )
}

