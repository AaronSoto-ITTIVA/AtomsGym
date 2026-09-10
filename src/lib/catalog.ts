import type { Exercise, Level, Routine, RoutineExercise } from '../types'
import { equipment, equipmentById } from '../data/equipment'
import { exercises, exercisesById } from '../data/exercises'
import { routines } from '../data/routines'

export function getEquipment(id: string) {
  return equipmentById[id]
}

export function getExercise(id: string) {
  return exercisesById[id]
}

export function exercisesForEquipment(equipmentId: string): Exercise[] {
  return exercises.filter(
    (exercise) => exercise.equipmentId === equipmentId || exercise.alsoUses?.includes(equipmentId),
  )
}

export function routineExercisesForLevel(routine: Routine, level: Level) {
  return routine.exercises
    .map((slot) => {
      const exercise = getExercise(slot.exerciseId)
      const prescription = slot.levels[level]
      if (!exercise || !prescription) return null
      return { exercise, prescription, slot }
    })
    .filter((row): row is { exercise: Exercise; prescription: NonNullable<RoutineExercise['levels'][Level]>; slot: RoutineExercise } => row !== null)
}

export function equipmentUsedInRoutine(routine: Routine, level: Level) {
  const ids = new Set<string>()
  for (const row of routineExercisesForLevel(routine, level)) {
    ids.add(row.exercise.equipmentId)
    row.exercise.alsoUses?.forEach((id) => ids.add(id))
  }
  return [...ids].map((id) => equipmentById[id]).filter((item): item is NonNullable<typeof item> => Boolean(item))
}

export { equipment, exercises, routines }
