'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface QuizProps {
  question: string
  options: string[]
  correctAnswer: number // Index of correct option (0-based)
  explanation?: string // Explanation shown after answering
  xpReward?: number // Default: 10
}

export default function Quiz({
  question,
  options,
  correctAnswer,
  explanation,
  xpReward = 10,
}: QuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)

  const handleOptionClick = (index: number) => {
    if (!isAnswered) {
      setSelectedAnswer(index)
      setIsAnswered(true)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="my-8 p-6 bg-purple-900/30 border-2 border-purple-500 rounded-lg"
    >
      <h3 className="text-xl font-bold mb-4 text-purple-200">⚡ {question}</h3>
      <div className="space-y-2">
        {options.map((option, index) => {
          const isCorrect = index === correctAnswer
          const isSelected = index === selectedAnswer
          let buttonClass = 'block w-full text-left p-3 rounded transition-colors '

          if (isAnswered) {
            buttonClass += 'cursor-not-allowed '
            if (isSelected) {
              buttonClass += isCorrect
                ? 'border-green-500 bg-green-900/20 '
                : 'border-red-500 bg-red-900/20 '
            }
            if (isCorrect) {
              buttonClass += 'border-2 border-green-500'
            }
          } else {
            buttonClass += 'bg-purple-800/50 hover:bg-purple-700'
          }

          return (
            <button
              key={index}
              disabled={isAnswered}
              onClick={() => handleOptionClick(index)}
              className={buttonClass}
            >
              {option}
              {isAnswered && isSelected && (
                <span className="ml-2 font-bold">
                  {isCorrect ? `✓ 正確！+${xpReward} XP` : '❌ 錯誤'}
                </span>
              )}
            </button>
          )
        })}
      </div>
      {isAnswered && explanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 p-4 bg-gray-800/50 rounded"
        >
          <p className="text-purple-200">{explanation}</p>
        </motion.div>
      )}
    </motion.div>
  )
}
