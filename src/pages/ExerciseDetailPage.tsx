import { Link, useParams } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { FavoriteButton } from '../components/FavoriteButton'
import { ExerciseMedia } from '../components/ExerciseMedia'
import { exercisesById } from '../data/exercises'
import { equipmentById } from '../data/equipment'
import { useLevel } from '../lib/level'
import { routines } from '../data/routines'
import { formatRest } from '../lib/search'
import { levelMeta } from '../lib/levels'
import { LevelSwitch } from '../components/LevelSwitch'

export function ExerciseDetailPage() {
  const { id = '' } = useParams()
  const { level } = useLevel()
  const exercise = exercisesById[id]
  const gear = exercise ? equipmentById[exercise.equipmentId] : undefined

  if (!exercise) {
    return (
      <div className="px-4 py-10">
        <p>Ejercicio no encontrado.</p>
      </div>
    )
  }

  const sample = routines
    .flatMap((routine) => routine.exercises.map((slot) => ({ routine, slot })))
    .find((row) => row.slot.exerciseId === exercise.id && row.slot.levels[level])

  const prescription = sample?.slot.levels[level]
  const meta = levelMeta[level]

  return (
    <div className="safe-bottom">
      <TopBar backTo="/exercises" />
      <div className="h-72">
        <ExerciseMedia
          src={exercise.image}
          alt={exercise.name}
          pattern={exercise.pattern}
          title={exercise.name}
          muscle={exercise.muscleGroup}
          compact
        />
      </div>
      <div className="space-y-5 px-4 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">{exercise.muscleGroup}</p>
            <h1 className="mt-1 font-display text-[2.15rem] font-bold uppercase">{exercise.name}</h1>
          </div>
          <FavoriteButton kind="exercise" id={exercise.id} />
        </div>

        <LevelSwitch />
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Meta label="Equipo" value={gear?.name ?? '—'} to={gear ? `/equipment/${gear.id}` : undefined} />
          <Meta label="Dificultad del ejercicio" value={exercise.difficulty} />
          <Meta label={`Series · ${meta.label}`} value={prescription ? String(prescription.sets) : '3-4'} />
          <Meta label="Repeticiones" value={prescription?.reps ?? '8-12'} />
          <Meta label="Descanso" value={prescription ? formatRest(prescription.rest) : '01:30'} />
          <Meta label="Técnica" value={prescription?.technique ?? 'Ninguna'} />
        </div>

        <Block title="Ejecución" items={exercise.instructions} ordered />
        <Block title="Posición inicial" items={exercise.startPosition} ordered />
        <Block title="Movimiento" items={exercise.movement} ordered />

        <section>
          <h2 className="mb-2 font-display text-2xl uppercase">Respiración</h2>
          <p className="text-sm leading-relaxed text-mute-strong">{exercise.breathing}</p>
        </section>

        <Block title="Consejos" items={exercise.tips} />
        <Block title="Errores comunes" items={exercise.commonMistakes} />
      </div>
    </div>
  )
}

function Meta({ label, value, to }: { label: string; value: string; to?: string }) {
  const content = <p className="text-sm font-semibold">{value}</p>
  return (
    <div className="rounded-2xl bg-ink-800 p-3">
      <p className="text-[11px] uppercase tracking-wide text-mute">{label}</p>
      {to ? (
        <Link to={to} className="text-gold">
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  )
}

function Block({ title, items, ordered }: { title: string; items: string[]; ordered?: boolean }) {
  const List = ordered ? 'ol' : 'ul'
  return (
    <section>
      <h2 className="mb-2 font-display text-2xl uppercase">{title}</h2>
      <List className={`space-y-2 text-sm leading-relaxed text-mute-strong ${ordered ? 'list-decimal pl-5' : 'list-disc pl-5'}`}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </List>
    </section>
  )
}
