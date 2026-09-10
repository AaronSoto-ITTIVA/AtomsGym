import { Link, useNavigate, useParams } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { FavoriteButton } from '../components/FavoriteButton'
import { IntensityPips, LevelSwitch } from '../components/LevelSwitch'
import { ExerciseMedia } from '../components/ExerciseMedia'
import { useLevel } from '../lib/level'
import { equipmentUsedInRoutine, getExercise, routineExercisesForLevel } from '../lib/catalog'
import { routinesById } from '../data/routines'
import { formatRest } from '../lib/search'
import { levelMeta, summarizeRoutineLevel } from '../lib/levels'

export function RoutineDetailPage() {
  const { id = '' } = useParams()
  const { level } = useLevel()
  const navigate = useNavigate()
  const routine = routinesById[id]

  if (!routine) {
    return (
      <div className="px-4 py-10">
        <p>Rutina no encontrada.</p>
        <Link to="/routines" className="text-gold">
          Volver
        </Link>
      </div>
    )
  }

  const rows = routineExercisesForLevel(routine, level)
  const gear = equipmentUsedInRoutine(routine, level)
  const summary = summarizeRoutineLevel(routine, level)
  const meta = levelMeta[level]

  return (
    <div className="safe-bottom">
      <TopBar backTo="/routines" />
      <div className="overflow-hidden">
        <div className="h-56">
          <ExerciseMedia
            src={routine.image}
            alt={routine.name}
            pattern={rows[0]?.exercise.pattern ?? 'press-h'}
            title={routine.name}
            muscle={routine.focus}
            compact
          />
        </div>
      </div>
      <div className="space-y-5 px-4 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: meta.color }}>
              {meta.label} · {summary.duration} min
            </p>
            <h1 className="mt-1 font-display text-[2.15rem] font-bold uppercase">{routine.name}</h1>
          </div>
          <FavoriteButton kind="routine" id={routine.id} />
        </div>
        <p className="text-sm leading-relaxed text-mute-strong">{routine.description}</p>
        <LevelSwitch />
        <div className="grid grid-cols-2 gap-2">
          <Stat label="Ejercicios" value={String(summary.exercises)} />
          <Stat label="Series" value={summary.setsLabel} />
          <Stat label="Duración" value={`${summary.duration} min`} />
          <Stat
            label="Técnicas"
            value={summary.hasTechniques ? 'Sí' : 'No'}
            hint={summary.hasTechniques ? 'Dropsets / superseries' : 'Solo ejecución limpia'}
          />
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-ink-800 px-4 py-3">
          <p className="text-sm text-mute-strong">{meta.focus}</p>
          <IntensityPips level={level} />
        </div>
        <div className="flex flex-wrap gap-2">
          {routine.muscles.map((muscle) => (
            <span key={muscle} className="rounded-full bg-ink-700 px-3 py-1 text-xs font-semibold">
              {muscle}
            </span>
          ))}
        </div>
        <section>
          <h2 className="mb-2 font-display text-xl uppercase">Equipamiento</h2>
          <div className="flex flex-wrap gap-2">
            {gear.map((item) => (
              <Link key={item.id} to={`/equipment/${item.id}`} className="rounded-full bg-ink-800 px-3 py-1 text-xs">
                {item.name}
              </Link>
            ))}
          </div>
        </section>
        <section className="space-y-3">
          <h2 className="font-display text-xl uppercase">Ejercicios</h2>
          {rows.map(({ exercise, prescription }) => (
            <Link
              key={exercise.id}
              to={`/exercises/${exercise.id}`}
              className="flex gap-3 overflow-hidden rounded-3xl bg-ink-800"
            >
              <div className="h-28 w-28 shrink-0">
                <ExerciseMedia
                  src={exercise.image}
                  alt={exercise.name}
                  pattern={exercise.pattern}
                  title={exercise.name}
                  muscle={exercise.muscleGroup}
                  compact
                  className="min-h-28"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center py-3 pr-3">
                <h3 className="font-display text-lg font-bold uppercase">{exercise.name}</h3>
                <p className="text-xs text-mute">{getExercise(exercise.id)?.muscleGroup}</p>
                <p className="mt-2 text-sm font-semibold" style={{ color: meta.color }}>
                  {prescription.sets} series · {prescription.reps} · descanso {formatRest(prescription.rest)}
                </p>
                {prescription.technique ? (
                  <p className="mt-1 text-xs font-semibold" style={{ color: meta.color }}>
                    {prescription.technique}
                  </p>
                ) : level === 'Principiante' ? (
                  <p className="mt-1 text-xs text-mute">Sin técnica avanzada</p>
                ) : null}
              </div>
            </Link>
          ))}
        </section>
        <button
          type="button"
          onClick={() => navigate(`/workout/${routine.id}`)}
          className="w-full rounded-full py-4 text-center text-sm font-extrabold uppercase tracking-[0.16em] shadow-glow"
          style={{ background: meta.color, color: meta.text }}
        >
          Comenzar rutina
        </button>
      </div>
    </div>
  )
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl bg-ink-800 p-3">
      <p className="text-[11px] uppercase tracking-[0.14em] text-mute">{label}</p>
      <p className="mt-1 font-display text-xl font-bold uppercase">{value}</p>
      {hint && <p className="mt-1 text-xs text-mute">{hint}</p>}
    </div>
  )
}
