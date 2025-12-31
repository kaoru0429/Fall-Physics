import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface GameState {
  xp: number
  level: number
  hp: number
  maxHp: number
  addXP: (amount: number) => void
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      xp: 0,
      level: 1,
      hp: 100,
      maxHp: 100,
      addXP: (amount) =>
        set((state) => {
          try {
            const newXP = state.xp + amount
            const newLevel = Math.floor(newXP / 100) + 1

            return {
              xp: newXP,
              level: newLevel,
              hp: newLevel > state.level ? state.maxHp : state.hp
            }
          } catch (error) {
            console.error('XP 更新失敗:', error)
            return state
          }
        }),
    }),
    {
      name: 'newton-save',
      onRehydrateStorage: () => (state) => {
        console.log('遊戲存檔已載入')
      },
    }
  )
)
