'use client'

import { useState } from 'react'
import { useGameStore } from '../../lib/store'

interface QuizProps {
  question: string
  options: string[]
  correctAnswer: number
  xpReward?: number
}

export function Quiz({ question, options, correctAnswer, xpReward }: QuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const addXP = useGameStore((state) => state.addXP)

  const handleAnswer = (index: number) => {
    if (isAnswered || isProcessing) return
    setIsProcessing(true)
    setSelectedAnswer(index)
    setIsAnswered(true)
    if (index === correctAnswer) {
      addXP(xpReward || 10)
    }
    setTimeout(() => setIsProcessing(false), 500)
  }

  return (
    <div className="my-8 p-6 bg-purple-900/30 border-2 border-purple-500 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-purple-200">⚡ {question}</h3>
      <div className="space-y-2">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            disabled={isAnswered}
            className={`block w-full text-left p-3 rounded transition-colors ${
              isAnswered && i === correctAnswer
                ? 'bg-green-500/50 border-green-500'
                : isAnswered && i === selectedAnswer
                ? 'bg-red-500/50 border-red-500'
                : 'bg-purple-800/50 hover:bg-purple-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {opt}
          </button>
        ))}
      </div>
      {isAnswered && (
        <p className="mt-4 text-sm">
          {selectedAnswer === correctAnswer
            ? `✓ 答對了！獲得 ${xpReward || 10} XP`
            : '✗ 答錯了，再試一次吧！'}
        </p>
      )}
    </div>
  )
}
