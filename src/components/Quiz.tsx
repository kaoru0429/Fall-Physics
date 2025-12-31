'use client'

import { useState } from 'react'

interface QuizProps {
  question: string
  options: string[]
  answer?: string // Option index or text matching the correct answer. 
  // Since current MDX doesn't have 'answer', I'll make it optional or just interactive without validation for now, 
  // but better to add 'answer' prop to MDX files later.
  // For now, let's just show selection state.
  correctIndex?: number
}

export default function Quiz({ question, options, correctIndex }: QuizProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleSelect = (index: number) => {
    setSelected(index)
    setShowResult(true)
  }

  return (
    <div className="my-8 p-6 bg-purple-900/30 border-2 border-purple-500 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-purple-200">⚡ {question}</h3>
      <div className="space-y-2">
        {options.map((opt, i) => (
          <button 
            key={i} 
            onClick={() => handleSelect(i)}
            disabled={showResult}
            className={`block w-full text-left p-3 rounded transition-colors border ${
              selected === i 
                ? (correctIndex !== undefined 
                    ? (i === correctIndex ? 'bg-green-600 border-green-400' : 'bg-red-600 border-red-400')
                    : 'bg-purple-600 border-purple-400')
                : 'bg-purple-800/50 border-transparent hover:bg-purple-700'
            } ${showResult && correctIndex !== undefined && i === correctIndex ? 'bg-green-600 border-green-400 ring-2 ring-green-300' : ''}`}
          >
            {opt}
            {showResult && selected === i && (
              <span className="ml-2">
                {correctIndex !== undefined 
                  ? (i === correctIndex ? '✅' : '❌')
                  : '👈'}
              </span>
            )}
          </button>
        ))}
      </div>
      {showResult && correctIndex !== undefined && (
        <div className="mt-4 p-3 bg-black/30 rounded">
          <p className={selected === correctIndex ? "text-green-400" : "text-red-400"}>
            {selected === correctIndex ? "答對了！" : "再試一次！"}
          </p>
        </div>
      )}
    </div>
  )
}
