import { equipment, exercises, routines } from './catalog'

export interface SearchHit {
  kind: 'routine' | 'exercise' | 'equipment'
  id: string
  title: string
  subtitle: string
  to: string
}

function match(haystack: string, needle: string) {
  return haystack.toLocaleLowerCase('es').includes(needle)
}

export function searchAll(query: string): SearchHit[] {
  const q = query.trim().toLocaleLowerCase('es')
  if (!q) return []

  const hits: SearchHit[] = []

  for (const exercise of exercises) {
    const gear = equipment.find((item) => item.id === exercise.equipmentId)
    const blob = [
      exercise.name,
      exercise.muscleGroup,
      exercise.secondaryMuscles.join(' '),
      gear?.name ?? '',
      exercise.pattern === 'lunge' ? 'desplante zancada' : '',
      exercise.pattern === 'core' ? 'plancha abdomen core' : '',
      exercise.equipmentId === 'bodyweight' ? 'calistenia' : '',
    ].join(' ')
    if (match(blob, q)) {
      hits.push({
        kind: 'exercise',
        id: exercise.id,
        title: exercise.name,
        subtitle: exercise.muscleGroup,
        to: `/exercises/${exercise.id}`,
      })
    }
  }

  for (const item of equipment) {
    const blob = [item.name, item.category, item.primaryMuscles.join(' ')].join(' ')
    if (match(blob, q)) {
      hits.push({
        kind: 'equipment',
        id: item.id,
        title: item.name,
        subtitle: item.category,
        to: `/equipment/${item.id}`,
      })
    }
  }

  for (const routine of routines) {
    const blob = [routine.name, routine.description, routine.muscles.join(' '), routine.focus].join(' ')
    if (match(blob, q)) {
      hits.push({
        kind: 'routine',
        id: routine.id,
        title: routine.name,
        subtitle: routine.muscles.join(' · '),
        to: `/routine/${routine.id}`,
      })
    }
  }

  return hits
}

export const LEVELS = ['Principiante', 'Intermedio', 'Avanzado'] as const

export function formatRest(seconds: number) {
  if (seconds <= 0) return '—'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function formatClock(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export const muscleTone: Record<string, string> = {
  Pecho: '#ff6b4a',
  Espalda: '#4ac8ff',
  Pierna: '#fcbc10',
  Glúteo: '#ff4d8d',
  Femoral: '#c084fc',
  Cuádriceps: '#facc15',
  Hombro: '#fb923c',
  Bíceps: '#38bdf8',
  Tríceps: '#a3e635',
  'Full Body': '#fcbc10',
  Cardio: '#22d3ee',
  Push: '#ff6b4a',
  Pull: '#4ac8ff',
  Legs: '#fcbc10',
  Fuerza: '#f8fafc',
  Principiantes: '#fcbc10',
  Desplantes: '#fcbc10',
  'Peso corporal': '#fcbc10',
  Core: '#34d399',
}
