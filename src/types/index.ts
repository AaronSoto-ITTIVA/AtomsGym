export type MuscleGroup =
  | 'Pecho'
  | 'Espalda'
  | 'Pierna'
  | 'Glúteo'
  | 'Femoral'
  | 'Cuádriceps'
  | 'Hombro'
  | 'Bíceps'
  | 'Tríceps'
  | 'Full Body'
  | 'Core'
  | 'Cardio'

export type Level = 'Principiante' | 'Intermedio' | 'Avanzado'

export type Difficulty = 'Principiante' | 'Intermedio' | 'Avanzado'

export type EquipmentCategory =
  | 'Pierna y glúteo'
  | 'Espalda'
  | 'Pecho'
  | 'Hombro'
  | 'Brazos'
  | 'Cardio'
  | 'Libre'

export type MovementPattern =
  | 'press-h'
  | 'press-v'
  | 'pull-h'
  | 'pull-v'
  | 'squat'
  | 'hinge'
  | 'curl'
  | 'extension'
  | 'fly'
  | 'open'
  | 'raise'
  | 'cardio'
  | 'kickback'
  | 'lunge'
  | 'core'

export interface Equipment {
  id: string
  name: string
  category: EquipmentCategory
  image: string
  primaryMuscles: MuscleGroup[]
  description: string
}

export interface Exercise {
  id: string
  name: string
  equipmentId: string
  alsoUses?: string[]
  muscleGroup: MuscleGroup
  secondaryMuscles: string[]
  image: string
  difficulty: Difficulty
  pattern: MovementPattern
  startPosition: string[]
  movement: string[]
  breathing: string
  instructions: string[]
  tips: string[]
  commonMistakes: string[]
}

export interface LevelPrescription {
  sets: number
  reps: string
  rest: number
  technique?: string
}

export interface RoutineExercise {
  exerciseId: string
  levels: Record<Level, LevelPrescription | null>
}

export interface Routine {
  id: string
  name: string
  description: string
  duration: Record<Level, number>
  muscles: MuscleGroup[]
  featured?: boolean
  image: string
  focus: MuscleGroup | 'Push' | 'Pull' | 'Legs' | 'Fuerza' | 'Principiantes' | 'Desplantes' | 'Peso corporal'
  exercises: RoutineExercise[]
}

export type FavoriteKind = 'routine' | 'exercise' | 'equipment'
