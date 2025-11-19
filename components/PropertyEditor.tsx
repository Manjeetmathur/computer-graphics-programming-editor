'use client'

import { useState, useEffect } from 'react'
import type { Shape } from '@/types/graphics'

interface PropertyEditorProps {
  shape: Shape | null
  onUpdate: (shape: Shape) => void
}

export default function PropertyEditor({ shape, onUpdate }: PropertyEditorProps) {
  const [localShape, setLocalShape] = useState<Shape | null>(shape)

  useEffect(() => {
    setLocalShape(shape)
  }, [shape])

  if (!localShape) {
    return (
      <div className="p-2 sm:p-3">
        <p className="text-gray-400 text-xs">Select a shape to edit properties</p>
      </div>
    )
  }

  const handleChange = (field: string, value: number | string | Array<{ x: number; y: number }>) => {
    if (!localShape) return

    const updated = {
      ...localShape,
      [field]: Array.isArray(value) ? value : (typeof value === 'string' && !isNaN(Number(value)) ? Number(value) : value),
    } as Shape

    setLocalShape(updated)
    onUpdate(updated)
  }

  const renderInputs = () => {
    switch (localShape.type) {
      case 'pixel':
        return (
          <>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">X</label>
              <input
                type="number"
                value={localShape.x}
                onChange={(e) => handleChange('x', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Y</label>
              <input
                type="number"
                value={localShape.y}
                onChange={(e) => handleChange('y', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
          </>
        )

      case 'line':
        return (
          <>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">X1</label>
              <input
                type="number"
                value={localShape.x1}
                onChange={(e) => handleChange('x1', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Y1</label>
              <input
                type="number"
                value={localShape.y1}
                onChange={(e) => handleChange('y1', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">X2</label>
              <input
                type="number"
                value={localShape.x2}
                onChange={(e) => handleChange('x2', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Y2</label>
              <input
                type="number"
                value={localShape.y2}
                onChange={(e) => handleChange('y2', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
          </>
        )

      case 'rectangle':
        return (
          <>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">X1</label>
              <input
                type="number"
                value={localShape.x1}
                onChange={(e) => handleChange('x1', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Y1</label>
              <input
                type="number"
                value={localShape.y1}
                onChange={(e) => handleChange('y1', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">X2</label>
              <input
                type="number"
                value={localShape.x2}
                onChange={(e) => handleChange('x2', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Y2</label>
              <input
                type="number"
                value={localShape.y2}
                onChange={(e) => handleChange('y2', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
          </>
        )

      case 'circle':
        return (
          <>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">X</label>
              <input
                type="number"
                value={localShape.x}
                onChange={(e) => handleChange('x', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Y</label>
              <input
                type="number"
                value={localShape.y}
                onChange={(e) => handleChange('y', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Radius</label>
              <input
                type="number"
                value={localShape.radius}
                onChange={(e) => handleChange('radius', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
          </>
        )

      case 'arc':
        return (
          <>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">X</label>
              <input
                type="number"
                value={localShape.x}
                onChange={(e) => handleChange('x', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Y</label>
              <input
                type="number"
                value={localShape.y}
                onChange={(e) => handleChange('y', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Radius</label>
              <input
                type="number"
                value={localShape.radius}
                onChange={(e) => handleChange('radius', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Start Angle</label>
              <input
                type="number"
                value={localShape.startAngle}
                onChange={(e) => handleChange('startAngle', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">End Angle</label>
              <input
                type="number"
                value={localShape.endAngle}
                onChange={(e) => handleChange('endAngle', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
          </>
        )

      case 'ellipse':
        return (
          <>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">X</label>
              <input
                type="number"
                value={localShape.x}
                onChange={(e) => handleChange('x', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Y</label>
              <input
                type="number"
                value={localShape.y}
                onChange={(e) => handleChange('y', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Radius X</label>
              <input
                type="number"
                value={localShape.radiusX}
                onChange={(e) => handleChange('radiusX', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Radius Y</label>
              <input
                type="number"
                value={localShape.radiusY}
                onChange={(e) => handleChange('radiusY', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
          </>
        )

      case 'triangle':
        return (
          <>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">X1</label>
              <input
                type="number"
                value={localShape.x1}
                onChange={(e) => handleChange('x1', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Y1</label>
              <input
                type="number"
                value={localShape.y1}
                onChange={(e) => handleChange('y1', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">X2</label>
              <input
                type="number"
                value={localShape.x2}
                onChange={(e) => handleChange('x2', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Y2</label>
              <input
                type="number"
                value={localShape.y2}
                onChange={(e) => handleChange('y2', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">X3</label>
              <input
                type="number"
                value={localShape.x3}
                onChange={(e) => handleChange('x3', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Y3</label>
              <input
                type="number"
                value={localShape.y3}
                onChange={(e) => handleChange('y3', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
          </>
        )

      case 'filledRectangle':
        return (
          <>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">X1</label>
              <input
                type="number"
                value={localShape.x1}
                onChange={(e) => handleChange('x1', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Y1</label>
              <input
                type="number"
                value={localShape.y1}
                onChange={(e) => handleChange('y1', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">X2</label>
              <input
                type="number"
                value={localShape.x2}
                onChange={(e) => handleChange('x2', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Y2</label>
              <input
                type="number"
                value={localShape.y2}
                onChange={(e) => handleChange('y2', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
          </>
        )

      case 'filledCircle':
        return (
          <>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">X</label>
              <input
                type="number"
                value={localShape.x}
                onChange={(e) => handleChange('x', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Y</label>
              <input
                type="number"
                value={localShape.y}
                onChange={(e) => handleChange('y', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Radius</label>
              <input
                type="number"
                value={localShape.radius}
                onChange={(e) => handleChange('radius', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
          </>
        )

      case 'pieSlice':
        return (
          <>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">X</label>
              <input
                type="number"
                value={localShape.x}
                onChange={(e) => handleChange('x', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Y</label>
              <input
                type="number"
                value={localShape.y}
                onChange={(e) => handleChange('y', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Radius</label>
              <input
                type="number"
                value={localShape.radius}
                onChange={(e) => handleChange('radius', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Start Angle</label>
              <input
                type="number"
                value={localShape.startAngle}
                onChange={(e) => handleChange('startAngle', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
            <div className="mb-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">End Angle</label>
              <input
                type="number"
                value={localShape.endAngle}
                onChange={(e) => handleChange('endAngle', e.target.value)}
                className="w-full px-2 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 touch-manipulation"
              />
            </div>
          </>
        )

      case 'polygon':
        return (
          <div className="mb-2">
            <label className="block text-xs font-medium text-gray-600 mb-2">Polygon Points</label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {localShape.points.map((point, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-0.5">Point {index + 1}</label>
                    <div className="flex gap-1">
                      <input
                        type="number"
                        placeholder="X"
                        value={point.x}
                        onChange={(e) => {
                          const newPoints = [...localShape.points]
                          newPoints[index] = { ...point, x: Number(e.target.value) }
                          handleChange('points', newPoints)
                        }}
                        className="w-1/2 px-2 py-1 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <input
                        type="number"
                        placeholder="Y"
                        value={point.y}
                        onChange={(e) => {
                          const newPoints = [...localShape.points]
                          newPoints[index] = { ...point, y: Number(e.target.value) }
                          handleChange('points', newPoints)
                        }}
                        className="w-1/2 px-2 py-1 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const newPoints = localShape.points.filter((_, i) => i !== index)
                      handleChange('points', newPoints)
                    }}
                    className="text-red-400 hover:text-red-600 text-sm px-1"
                    disabled={localShape.points.length <= 3}
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newPoints = [...localShape.points, { x: 0, y: 0 }]
                  handleChange('points', newPoints)
                }}
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md hover:bg-gray-50 text-gray-600"
              >
                + Add Point
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="p-2 sm:p-3 border-t border-gray-200 bg-white">
      <h2 className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 text-gray-600 uppercase tracking-wide">
        Properties: {localShape.type.charAt(0).toUpperCase() + localShape.type.slice(1)}
      </h2>
      {renderInputs()}
      <div className="mb-2 mt-2 sm:mt-3">
        <label className="block text-xs font-medium text-gray-600 mb-1">Color</label>
        <input
          type="color"
          value={localShape.color || '#000000'}
          onChange={(e) => handleChange('color', e.target.value)}
          className="w-full h-8 sm:h-10 border border-gray-200 rounded-md cursor-pointer touch-manipulation"
        />
      </div>
    </div>
  )
}

