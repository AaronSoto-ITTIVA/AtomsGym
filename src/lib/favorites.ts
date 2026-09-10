import type { FavoriteKind } from '../types'

const KEY = 'atoms:favorites'

export interface FavoritesState {
  routine: string[]
  exercise: string[]
  equipment: string[]
}

const empty: FavoritesState = { routine: [], exercise: [], equipment: [] }

function read(): FavoritesState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return empty
    return { ...empty, ...JSON.parse(raw) }
  } catch {
    return empty
  }
}

function write(state: FavoritesState) {
  localStorage.setItem(KEY, JSON.stringify(state))
}

export function getFavorites() {
  return read()
}

export function isFavorite(kind: FavoriteKind, id: string) {
  return read()[kind].includes(id)
}

export function toggleFavorite(kind: FavoriteKind, id: string) {
  const state = read()
  const list = state[kind]
  state[kind] = list.includes(id) ? list.filter((item) => item !== id) : [...list, id]
  write(state)
  return state
}
