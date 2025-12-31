import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface GameState {
  // Player stats
  playerName: string
  hp: number
  maxHp: number
  xp: number
  level: number
  inventory: string[]
  currentChapter: string
  completedChapters: string[]
  answeredQuestions: Record<string, boolean> // questionId: isCorrect
  // Actions
  takeDamage: (amount: number) => void
  heal: (amount: number) => void
  addXP: (amount: number) => void
  addItem: (item: string) => void
  setChapter: (chapterSlug: string) => void
  completeChapter: (chapterSlug: string) => void
  recordAnswer: (questionId: string, isCorrect: boolean) => void
  resetGame: () => void
}

const initialState = {
  playerName: "冒險者",
  hp: 100,
  maxHp: 100,
  xp: 0,
  level: 1,
  inventory: [],
  currentChapter: '',
  completedChapters: [],
  answeredQuestions: {},
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...initialState,
      takeDamage: (amount: number) => set((state) => ({ hp: Math.max(0, state.hp - amount) })),
      heal: (amount: number) => set((state) => ({ hp: Math.min(state.maxHp, state.hp + amount) })),
      addXP: (amount: number) => {
        const newXP = get().xp + amount
        const newLevel = Math.floor(newXP / 100) + 1
        set((state) => {
          if (newLevel > state.level) {
            return { xp: newXP, level: newLevel, hp: state.maxHp }
          }
          return { xp: newXP }
        })
      },
      addItem: (item: string) => set((state) => ({ inventory: [...state.inventory, item] })),
      setChapter: (chapterSlug: string) => set({ currentChapter: chapterSlug }),
      completeChapter: (chapterSlug: string) =>
        set((state) => ({
          completedChapters: [...new Set([...state.completedChapters, chapterSlug])],
        })),
      recordAnswer: (questionId: string, isCorrect: boolean) =>
        set((state) => ({
          answeredQuestions: { ...state.answeredQuestions, [questionId]: isCorrect },
        })),
      resetGame: () => set(initialState),
    }),
    {
      name: 'newton-game-save', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : sessionStorage)), // (optional) by default, 'localStorage' is used
    }
  )
)
