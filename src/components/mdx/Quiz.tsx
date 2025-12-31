'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface QuizProps {
  question: string
  options: string[]
  correctAnswer: number // 0-based index
  explanation?: string
  xpReward?: number     // Default: 10
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
    if (isAnswered) return
    setSelectedAnswer(index)
    setIsAnswered(true)
  }

  const isCorrect = selectedAnswer === correctAnswer

  return (
    <div className="my-8 p-6 bg-purple-900/30 border-2 border-purple-500 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-purple-200">⚡ {question}</h3>
      <div className="space-y-2">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === index
          const isTheCorrectAnswer = index === correctAnswer

          let buttonClass = 'block w-full text-left p-3 bg-purple-800/50 rounded transition-all duration-300'
          if (isAnswered) {
            if (isTheCorrectAnswer) {
              buttonClass += ' border-2 border-green-500 bg-green-900/30'
            } else if (isSelected && !isTheCorrectAnswer) {
              buttonClass += ' border-2 border-red-500 bg-red-900/30'
            }
          } else {
            buttonClass += ' hover:bg-purple-700'
          }

          return (
            <button
              key={index}
              className={buttonClass}
              onClick={() => handleOptionClick(index)}
              disabled={isAnswered}
            >
              {option}
            </button>
          )
        })}
      </div>

      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4"
        >
          {isCorrect ? (
            <p className="text-green-400 font-bold">✓ 正確！+{xpReward} XP</p>
          ) : (
            <p className="text-red-400 font-bold">
              ✗ 錯誤，正確答案是：{options[correctAnswer]}
            </p>
          )}
          {explanation && (
            <p className="mt-2 text-sm text-gray-400">{explanation}</p>
          )}
        </motion.div>
      )}
    </div>
  )
}
