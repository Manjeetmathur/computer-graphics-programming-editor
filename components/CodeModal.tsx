'use client'

import { useState } from 'react'
import type { Shape } from '@/types/graphics'
import { generateCppCode } from '@/lib/cpp-code-generator'

interface CodeModalProps {
  shapes: Shape[]
  isOpen: boolean
  onClose: () => void
}

export default function CodeModal({ shapes, isOpen, onClose }: CodeModalProps) {
  const [copied, setCopied] = useState(false)
  const cppCode = generateCppCode(shapes)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cppCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([cppCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'graphics_program.cpp'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2 sm:p-4" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-700">Generated C++ Code</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none touch-manipulation"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="p-2 sm:p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex items-center justify-center gap-2 touch-manipulation"
            >
              {copied ? (
                <>
                  <span>✓</span>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <span>📋</span>
                  <span>Copy Code</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors flex items-center justify-center gap-2 touch-manipulation"
            >
              <span>⬇</span>
              <span>Download</span>
            </button>
          </div>
          
          <div className="flex-1 overflow-auto p-2 sm:p-4 bg-gray-900">
            <pre className="text-gray-100 text-xs sm:text-sm font-mono whitespace-pre-wrap">
              <code>{cppCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

