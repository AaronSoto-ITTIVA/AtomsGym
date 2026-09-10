import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ExerciseMedia } from '../components/ExerciseMedia'
import { routinesById } from '../data/routines'
import { equipmentById } from '../data/equipment'
import { useLevel } from '../lib/level'
import { routineExercisesForLevel } from '../lib/catalog'
import { formatClock, formatRest } from '../lib/search'
import { levelMeta } from '../lib/levels'

export function WorkoutPage() {
  const { id = '' } = useParams()
  const { level } = useLevel()
  const navigate = useNavigate()
  const routine = routinesById[id]
  const rows = useMemo(() => (routine ? routineExercisesForLevel(routine, level) : []), [routine, level])

  const [index, setIndex] = useState(0)
  const [setNumber, setSetNumber] = useState(1)
  const [restLeft, setRestLeft] = useState(0)
  const [resting, setResting] = useState(false)
  const [paused, setPaused] = useState(false)
  const [setsDone, setSetsDone] = useState(0)
  const startedAt = useRef(Date.now())

  const current = rows[index]
  const meta = levelMeta[level]
  const totalSets = rows.reduce((sum, row) => sum + row.prescription.sets, 0)

  useEffect(() => {
    if (!resting || paused || restLeft <= 0) return
    const timer = window.setInterval(() => {
      setRestLeft((value) => {
        if (value <= 1) {
          setResting(false)
          return 0
        }
        return value - 1
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [resting, paused, restLeft])

  if (!routine || !current) {
    return (
      <div className="px-4 py-10">
        <p>No hay ejercicios para este nivel.</p>
        <Link to="/" className="text-gold">
          Inicio
        </Link>
      </div>
    )
  }

  const exercise = current.exercise
  const prescription = current.prescription
  const gear = equipmentById[exercise.equipmentId]
  const progress = ((index + (setNumber - 1) / prescription.sets) / rows.length) * 100

  function finish(extraSet = false) {
    navigate(`/workout/${routine!.id}/done`, {
      state: {
        name: routine!.name,
        elapsed: Math.round((Date.now() - startedAt.current) / 1000),
        exercises: rows.length,
        sets: setsDone + (extraSet ? 1 : 0),
      },
    })
  }

  function completeSet() {
    const nextSets = setsDone + 1
    setSetsDone(nextSets)
    if (setNumber < prescription.sets) {
      setSetNumber(setNumber + 1)
      if (prescription.rest > 0) {
        setRestLeft(prescription.rest)
        setResting(true)
        setPaused(false)
      }
      return
    }
    if (index < rows.length - 1) {
      setIndex(index + 1)
      setSetNumber(1)
      const nextRest = rows[index + 1]?.prescription.rest ?? 0
      if (prescription.rest > 0) {
        setRestLeft(prescription.rest)
        setResting(true)
        setPaused(false)
      } else if (nextRest === 0) {
        setResting(false)
      }
      return
    }
    finish(true)
  }

  return (
    <div className="flex min-h-dvh flex-col bg-ink-950 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <header className="flex items-center justify-between px-4 pt-[max(0.9rem,env(safe-area-inset-top))]">
        <Link to={`/routine/${routine.id}`} className="text-sm font-semibold text-mute">
          Salir
        </Link>
        <div className="text-center">
          <p className="font-display text-lg font-bold uppercase">{routine.name}</p>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.14em]" style={{ color: meta.color }}>
            {meta.label}
          </p>
          <p className="text-xs text-mute">
            Ejercicio {index + 1} de {rows.length}
          </p>
        </div>
        <span className="w-10" />
      </header>

      <div className="px-4 pt-4">
        <div className="mb-2 flex justify-between text-xs font-semibold uppercase tracking-wide text-mute">
          <span>
            {index + 1} / {rows.length} ejercicios
          </span>
          <span>{setsDone} / {totalSets} series</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${Math.min(100, progress)}%`, background: meta.color }} />
        </div>
      </div>

      <div className="mt-4 h-56 px-4">
        <div className="h-full overflow-hidden rounded-3xl">
          <ExerciseMedia
            src={exercise.image}
            alt={exercise.name}
            pattern={exercise.pattern}
            title={exercise.name}
            muscle={exercise.muscleGroup}
            compact
          />
        </div>
      </div>

      <div className="space-y-3 px-4 pt-4">
        <h1 className="font-display text-[2.15rem] font-bold uppercase">{exercise.name}</h1>
        <p className="text-sm text-mute">{gear?.name} · {exercise.muscleGroup}</p>
        <div className="grid grid-cols-3 gap-2">
          <Stat label="Serie" value={`${setNumber} / ${prescription.sets}`} />
          <Stat label="Repeticiones" value={prescription.reps} />
          <Stat label="Descanso" value={formatRest(prescription.rest)} />
        </div>
        {prescription.technique && <p className="text-sm text-gold">{prescription.technique}</p>}
      </div>

      <div className="mt-4 px-4">
        <div className={`rounded-3xl p-4 ${resting ? 'bg-gold text-ink-950' : 'bg-ink-800'}`}>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em]">{resting ? 'Descanso' : 'Temporizador'}</p>
              <p className="font-display text-6xl font-extrabold leading-none">{formatClock(restLeft)}</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-5 gap-2 text-[11px] font-extrabold uppercase">
            <TimerBtn onClick={() => { if (restLeft === 0) setRestLeft(prescription.rest || 90); setResting(true); setPaused(false) }}>
              Iniciar
            </TimerBtn>
            <TimerBtn onClick={() => setPaused((value) => !value)}>{paused ? 'Seguir' : 'Pausar'}</TimerBtn>
            <TimerBtn onClick={() => { setRestLeft(prescription.rest); setPaused(false) }}>Reiniciar</TimerBtn>
            <TimerBtn onClick={() => setRestLeft((value) => value + 30)}>+30s</TimerBtn>
            <TimerBtn
              onClick={() => {
                setResting(false)
                setRestLeft(0)
              }}
            >
              Saltar
            </TimerBtn>
          </div>
        </div>
      </div>

      <div className="mt-auto grid grid-cols-3 gap-2 px-4 pt-5">
        <button
          type="button"
          disabled={index === 0 && setNumber === 1}
          onClick={() => {
            if (setNumber > 1) setSetNumber(setNumber - 1)
            else if (index > 0) {
              const prev = rows[index - 1]
              setIndex(index - 1)
              setSetNumber(prev.prescription.sets)
            }
          }}
          className="rounded-full bg-ink-700 py-4 text-xs font-bold uppercase disabled:opacity-30"
        >
          Anterior
        </button>
        <button
          type="button"
          onClick={completeSet}
          className="rounded-full bg-gold py-4 text-xs font-extrabold uppercase tracking-wide text-ink-950"
        >
          Serie completada
        </button>
        <button
          type="button"
          onClick={() => {
            if (index < rows.length - 1) {
              setIndex(index + 1)
              setSetNumber(1)
              setResting(false)
            } else finish()
          }}
          className="rounded-full bg-ink-700 py-4 text-xs font-bold uppercase"
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-ink-800 p-3">
      <p className="text-[11px] uppercase tracking-wide text-mute">{label}</p>
      <p className="font-display text-2xl uppercase leading-none">{value}</p>
    </div>
  )
}

function TimerBtn({ children, onClick }: { children: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="rounded-xl bg-black/20 py-2">
      {children}
    </button>
  )
}
