import type { Level, Routine } from '../types'
import { routineExercisesForLevel } from './catalog'

export const levelMeta: Record<
  Level,
  {
    label: string
    intensity: 1 | 2 | 3
    color: string
    text: string
    blurb: string
    focus: string
  }
> = {
  Principiante: {
    label: 'Principiante',
    intensity: 1,
    color: '#9dcfb0',
    text: '#102018',
    blurb: '3 series · 10-12 reps · más descanso. Sin técnicas avanzadas.',
    focus: 'Aprender el movimiento con control',
  },
  Intermedio: {
    label: 'Intermedio',
    intensity: 2,
    color: '#fcbc10',
    text: '#201c20',
    blurb: '4 series · 8-12 reps · volumen de hipertrofia.',
    focus: 'Cargar más y completar el circuito',
  },
  Avanzado: {
    label: 'Avanzado',
    intensity: 3,
    color: '#ec2424',
    text: '#fff6f6',
    blurb: '4-5 series · 5-10 reps · dropsets y superseries.',
    focus: 'Más intensidad y técnicas avanzadas',
  },
}

export function summarizeRoutineLevel(routine: Routine, level: Level) {
  const rows = routineExercisesForLevel(routine, level)
  const sets = rows.map((row) => row.prescription.sets)
  const techniques = [...new Set(rows.map((row) => row.prescription.technique).filter(Boolean) as string[])]
  const minSets = sets.length ? Math.min(...sets) : 0
  const maxSets = sets.length ? Math.max(...sets) : 0

  return {
    exercises: rows.length,
    duration: routine.duration[level],
    minSets,
    maxSets,
    setsLabel: minSets === maxSets ? `${maxSets} series` : `${minSets}-${maxSets} series`,
    techniques,
    hasTechniques: techniques.length > 0,
  }
}
