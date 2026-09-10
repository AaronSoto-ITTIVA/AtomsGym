import { Link } from 'react-router-dom'
import type { Equipment, Exercise, MovementPattern, Routine } from '../types'
import { ExerciseMedia } from './ExerciseMedia'
import { IntensityPips } from './LevelSwitch'
import { useLevel } from '../lib/level'
import { levelMeta, summarizeRoutineLevel } from '../lib/levels'

const focusPattern: Record<string, MovementPattern> = {
  Pecho: 'press-h',
  Espalda: 'pull-h',
  Pierna: 'squat',
  Glúteo: 'hinge',
  Femoral: 'hinge',
  Cuádriceps: 'squat',
  Hombro: 'press-v',
  Bíceps: 'curl',
  Tríceps: 'extension',
  'Full Body': 'squat',
  Cardio: 'cardio',
  Push: 'press-h',
  Pull: 'pull-v',
  Legs: 'squat',
  Fuerza: 'hinge',
  Principiantes: 'press-h',
  Desplantes: 'lunge',
  'Peso corporal': 'press-h',
  Core: 'core',
}

const equipmentPattern: Record<string, MovementPattern> = {
  'Pierna y glúteo': 'squat',
  Espalda: 'pull-h',
  Pecho: 'press-h',
  Hombro: 'raise',
  Brazos: 'curl',
  Cardio: 'cardio',
  Libre: 'press-v',
}

export function RoutineCard({ routine }: { routine: Routine }) {
  const { level } = useLevel()
  const summary = summarizeRoutineLevel(routine, level)
  const meta = levelMeta[level]

  return (
    <Link to={`/routine/${routine.id}`} className="min-w-[82%] overflow-hidden rounded-3xl bg-ink-800 snap-start">
      <div className="h-48">
        <ExerciseMedia
          src={routine.image}
          alt={routine.name}
          pattern={focusPattern[routine.focus] ?? 'press-h'}
          title={routine.name}
          muscle={routine.focus}
          compact
        />
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em]"
            style={{ background: meta.color, color: meta.text }}
          >
            {meta.label}
          </span>
          <IntensityPips level={level} />
        </div>
        <h3 className="font-display text-[1.35rem] font-bold uppercase">{routine.name}</h3>
        <p className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: meta.color }}>
          {summary.duration} min · {summary.exercises} ejercicios · {summary.setsLabel}
        </p>
        <p className="text-sm tracking-wide text-mute">{routine.muscles.join(' · ')}</p>
        {summary.hasTechniques ? (
          <p className="text-xs font-semibold" style={{ color: meta.color }}>
            Incluye técnicas avanzadas
          </p>
        ) : (
          <p className="text-xs text-mute">Sin técnicas avanzadas</p>
        )}
      </div>
    </Link>
  )
}

export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <Link to={`/exercises/${exercise.id}`} className="overflow-hidden rounded-3xl bg-ink-800">
      <div className="h-40">
        <ExerciseMedia
          src={exercise.image}
          alt={exercise.name}
          pattern={exercise.pattern}
          title={exercise.name}
          muscle={exercise.muscleGroup}
          compact
        />
      </div>
      <div className="p-3">
        <h3 className="font-display text-base font-bold uppercase">{exercise.name}</h3>
        <p className="mt-1 text-xs tracking-wide text-mute">{exercise.muscleGroup}</p>
      </div>
    </Link>
  )
}

export function EquipmentCard({ item }: { item: Equipment }) {
  return (
    <Link to={`/equipment/${item.id}`} className="overflow-hidden rounded-3xl bg-ink-800">
      <div className="h-40">
        <ExerciseMedia
          src={item.image}
          alt={item.name}
          pattern={item.id === 'bodyweight' ? 'lunge' : equipmentPattern[item.category] ?? 'press-h'}
          title={item.name}
          muscle={item.primaryMuscles[0]}
          compact
        />
      </div>
      <div className="p-3">
        <h3 className="font-display text-base font-bold uppercase">{item.name}</h3>
        <p className="mt-1 text-xs tracking-wide text-mute">{item.primaryMuscles.join(' / ')}</p>
      </div>
    </Link>
  )
}
