'use client'

import { useState } from 'react'
import type { Shape, ShapeType } from '@/types/graphics'
import { roundShapeCoordinates } from '@/lib/coordinate-utils'
import ShapePalette from '@/components/ShapePalette'
import PropertyEditor from '@/components/PropertyEditor'
import ShapeList from '@/components/ShapeList'
import GraphicsCanvas from '@/components/GraphicsCanvas'
import CodeModal from '@/components/CodeModal'

export default function Home() {
  const [shapes, setShapes] = useState<Shape[]>([])
  const [selectedShapeType, setSelectedShapeType] = useState<ShapeType | null>(null)
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null)
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false)
  const [mobileView, setMobileView] = useState<'editor' | 'canvas'>('editor')

  const handleSelectShapeType = (shapeType: ShapeType) => {
    setSelectedShapeType(shapeType)
    setSelectedShape(null)

    const newShape = createDefaultShape(shapeType)
    setShapes((prev) => [...prev, newShape])
    setSelectedShape(newShape)
  }

  const createDefaultShape = (type: ShapeType): Shape => {
    const id = `${type}-${Date.now()}-${Math.random()}`
    const base = { id, type, color: '#000000' }

    switch (type) {
      case 'pixel':
        return { ...base, x: 100, y: 100 } as Shape
      case 'line':
        return { ...base, x1: 100, y1: 100, x2: 200, y2: 200 } as Shape
      case 'rectangle':
        return { ...base, x1: 100, y1: 100, x2: 200, y2: 200 } as Shape
      case 'circle':
        return { ...base, x: 150, y: 150, radius: 50 } as Shape
      case 'arc':
        return { ...base, x: 150, y: 150, radius: 50, startAngle: 0, endAngle: 90 } as Shape
      case 'ellipse':
        return { ...base, x: 150, y: 150, radiusX: 80, radiusY: 50 } as Shape
      case 'triangle':
        return { ...base, x1: 100, y1: 200, x2: 150, y2: 100, x3: 200, y3: 200 } as Shape
      case 'polygon':
        return { ...base, points: [{ x: 100, y: 100 }, { x: 150, y: 50 }, { x: 200, y: 100 }, { x: 175, y: 150 }, { x: 125, y: 150 }] } as Shape
      case 'filledRectangle':
        return { ...base, x1: 100, y1: 100, x2: 200, y2: 200 } as Shape
      case 'filledCircle':
        return { ...base, x: 150, y: 150, radius: 50 } as Shape
      case 'pieSlice':
        return { ...base, x: 150, y: 150, radius: 50, startAngle: 0, endAngle: 90 } as Shape
      default:
        throw new Error(`Unknown shape type: ${type}`)
    }
  }

  const handleUpdateShape = (updatedShape: Shape) => {
    const rounded = roundShapeCoordinates(updatedShape)
    setShapes((prev) => prev.map((s) => (s.id === rounded.id ? rounded : s)))
    setSelectedShape(rounded)
  }

  const handleSelectShape = (shape: Shape) => {
    setSelectedShape(shape)
    setSelectedShapeType(null)
  }

  const handleDeleteShape = (id: string) => {
    setShapes((prev) => prev.filter((s) => s.id !== id))
    if (selectedShape?.id === id) {
      setSelectedShape(null)
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
      {/* Mobile View Toggle */}
      <div className="md:hidden flex border-b border-gray-200 bg-white">
        <button
          onClick={() => setMobileView('editor')}
          className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
            mobileView === 'editor'
              ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Editor
        </button>
        <button
          onClick={() => setMobileView('canvas')}
          className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
            mobileView === 'canvas'
              ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Canvas
        </button>
      </div>

      {/* Editor Panel */}
      <div
        className={`${
          mobileView === 'editor' ? 'flex' : 'hidden'
        } md:flex w-full md:w-1/2 border-r border-gray-200 flex-col overflow-y-auto bg-white`}
      >
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-2 sm:p-3">
            <h1 className="text-base sm:text-lg font-bold text-gray-700">C++ Graphics Editor</h1>
            <button
              onClick={() => setIsCodeModalOpen(true)}
              className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <span>💻</span>
              <span className="hidden xs:inline">Generate Code</span>
              <span className="xs:hidden">Code</span>
            </button>
          </div>
        </div>
        <ShapePalette onSelectShape={handleSelectShapeType} selectedShape={selectedShapeType} />
        <div className="flex flex-col lg:flex-row gap-2 sm:gap-4 p-2 sm:p-4">
          <div className="flex-1 min-w-0">
            <PropertyEditor shape={selectedShape} onUpdate={handleUpdateShape} />
          </div>
          <div className="flex-1 min-w-0">
            <ShapeList
              shapes={shapes}
              selectedShapeId={selectedShape?.id || null}
              onSelectShape={handleSelectShape}
              onDeleteShape={handleDeleteShape}
            />
          </div>
        </div>
      </div>

      {/* Canvas Panel */}
      <div
        className={`${
          mobileView === 'canvas' ? 'flex' : 'hidden'
        } md:flex w-full md:w-1/2 bg-gray-100`}
      >
        <GraphicsCanvas
          shapes={shapes}
          selectedShapeId={selectedShape?.id || null}
          onSelectShape={handleSelectShape}
          onUpdateShape={handleUpdateShape}
        />
      </div>

      <CodeModal shapes={shapes} isOpen={isCodeModalOpen} onClose={() => setIsCodeModalOpen(false)} />
      </div>
      
      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-2 px-4">
        <p className="text-xs text-gray-500 text-center">
          Developed by <span className="font-medium text-gray-700">Manjeet Mathur</span>
        </p>
      </footer>
    </div>
  )
}

