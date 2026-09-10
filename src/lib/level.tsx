import { createContext, useContext } from 'react'
import type { Level } from '../types'

export const LevelContext = createContext<{
  level: Level
  setLevel: (level: Level) => void
}>({
  level: 'Intermedio',
  setLevel: () => undefined,
})

export function useLevel() {
  return useContext(LevelContext)
}

const KEY = 'atoms:level'

export function readStoredLevel(): Level {
  try {
    const value = localStorage.getItem(KEY)
    if (value === 'Principiante' || value === 'Intermedio' || value === 'Avanzado') return value
  } catch {
    /* ignore */
  }
  return 'Intermedio'
}

export function storeLevel(level: Level) {
  localStorage.setItem(KEY, level)
}
