'use client'

import type { ShapeType } from '@/types/graphics'

interface ShapePaletteProps {
  onSelectShape: (shapeType: ShapeType) => void
  selectedShape: ShapeType | null
}

const shapes: { type: ShapeType; label: string; icon: string }[] = [
  { type: 'pixel', label: 'Pixel', icon: '●' },
  { type: 'line', label: 'Line', icon: '─' },
  { type: 'rectangle', label: 'Rectangle', icon: '▭' },
  { type: 'circle', label: 'Circle', icon: '○' },
  { type: 'arc', label: 'Arc', icon: '◐' },
  { type: 'ellipse', label: 'Ellipse', icon: '◯' },
  { type: 'triangle', label: 'Triangle', icon: '△' },
  { type: 'polygon', label: 'Polygon', icon: '⬟' },
  { type: 'filledRectangle', label: 'Filled Rect', icon: '■' },
  { type: 'filledCircle', label: 'Filled Circle', icon: '●' },
  { type: 'pieSlice', label: 'Pie Slice', icon: '◓' },
]

export default function ShapePalette({ onSelectShape, selectedShape }: ShapePaletteProps) {
  return (
    <div className="p-2 sm:p-3 border-b border-gray-200 bg-gray-50">
      <h2 className="text-xs sm:text-sm font-semibold mb-2 text-gray-600 uppercase tracking-wide">Graphics Shapes</h2>
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-3 lg:grid-cols-6 gap-1 sm:gap-1.5 max-h-48 sm:max-h-64 overflow-y-auto">
        {shapes.map((shape) => (
          <button
            key={shape.type}
            onClick={() => onSelectShape(shape.type)}
            className={`p-1.5 sm:p-2 border rounded-md transition-all text-center touch-manipulation ${
              selectedShape === shape.type
                ? 'border-blue-500 bg-blue-50 shadow-sm'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 active:bg-gray-100'
            }`}
          >
            <div className="text-base sm:text-lg mb-0.5 leading-none">{shape.icon}</div>
            <div className="text-[10px] xs:text-xs font-medium text-gray-600 truncate">{shape.label}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

