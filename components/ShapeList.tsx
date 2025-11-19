'use client'

import type { Shape } from '@/types/graphics'

interface ShapeListProps {
  shapes: Shape[]
  selectedShapeId: string | null
  onSelectShape: (shape: Shape) => void
  onDeleteShape: (id: string) => void
}

export default function ShapeList({ shapes, selectedShapeId, onSelectShape, onDeleteShape }: ShapeListProps) {
  if (shapes.length === 0) {
    return (
      <div className="p-2 sm:p-4">
        <p className="text-gray-500 text-xs sm:text-sm">No shapes added yet. Select a shape to add.</p>
      </div>
    )
  }

  return (
    <div className="p-2 sm:p-3 border-t border-gray-200 bg-gray-50">
      <h2 className="text-xs sm:text-sm font-semibold mb-2 text-gray-600 uppercase tracking-wide">Added Shapes</h2>
      <div className="space-y-1.5 max-h-48 sm:max-h-64 overflow-y-auto">
        {shapes.map((shape) => (
          <div
            key={shape.id}
            onClick={() => onSelectShape(shape)}
            className={`p-1.5 sm:p-2 border rounded-md cursor-pointer transition-all touch-manipulation ${
              selectedShapeId === shape.id
                ? 'border-blue-500 bg-blue-50 shadow-sm'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-xs text-gray-700 capitalize mb-0.5">{shape.type}</div>
                <div className="text-[10px] xs:text-xs text-gray-500 truncate">
                  {shape.type === 'pixel' && `(${shape.x}, ${shape.y})`}
                  {shape.type === 'line' && `(${shape.x1}, ${shape.y1}) → (${shape.x2}, ${shape.y2})`}
                  {shape.type === 'rectangle' && `(${shape.x1}, ${shape.y1}) → (${shape.x2}, ${shape.y2})`}
                  {shape.type === 'circle' && `(${shape.x}, ${shape.y}) R:${shape.radius}`}
                  {shape.type === 'arc' && `(${shape.x}, ${shape.y}) R:${shape.radius}`}
                  {shape.type === 'ellipse' && `(${shape.x}, ${shape.y})`}
                  {shape.type === 'triangle' && `(${shape.x1},${shape.y1}) (${shape.x2},${shape.y2}) (${shape.x3},${shape.y3})`}
                  {shape.type === 'polygon' && `${shape.points.length} points`}
                  {shape.type === 'filledRectangle' && `(${shape.x1}, ${shape.y1}) → (${shape.x2}, ${shape.y2})`}
                  {shape.type === 'filledCircle' && `(${shape.x}, ${shape.y}) R:${shape.radius}`}
                  {shape.type === 'pieSlice' && `(${shape.x}, ${shape.y}) R:${shape.radius}`}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteShape(shape.id)
                }}
                className="text-red-400 hover:text-red-600 text-base font-bold leading-none flex-shrink-0 w-6 h-6 sm:w-5 sm:h-5 flex items-center justify-center rounded hover:bg-red-50 active:bg-red-100 transition-colors touch-manipulation"
                aria-label="Delete shape"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

