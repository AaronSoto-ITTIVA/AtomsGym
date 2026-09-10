import { Link, useLocation, useParams } from 'react-router-dom'
import { routinesById } from '../data/routines'
import { formatClock } from '../lib/search'
import { BrandMark } from '../components/BrandMark'

interface DoneState {
  name: string
  elapsed: number
  exercises: number
  sets: number
}

export function WorkoutCompletePage() {
  const { id = '' } = useParams()
  const routine = routinesById[id]
  const location = useLocation()
  const state = (location.state as DoneState | null) ?? {
    name: routine?.name ?? 'Rutina',
    elapsed: 0,
    exercises: 0,
    sets: 0,
  }

  return (
    <div className="flex min-h-dvh flex-col bg-ink-950 px-4 pb-8 pt-[max(2rem,env(safe-area-inset-top))]">
      <BrandMark size="nav" />
      <h1 className="mt-3 font-display text-[2.6rem] font-bold uppercase">Rutina completada</h1>
      <p className="mt-3 text-mute">{state.name}</p>
      <div className="mt-8 grid gap-3">
        <Stat label="Tiempo total" value={formatClock(state.elapsed)} />
        <Stat label="Ejercicios completados" value={String(state.exercises)} />
        <Stat label="Series completadas" value={String(state.sets)} />
      </div>
      <div className="mt-auto grid gap-3">
        <Link to={`/routine/${id}`} className="rounded-full bg-gold py-4 text-center text-sm font-extrabold uppercase tracking-wide text-ink-950">
          Ver rutina
        </Link>
        <Link to="/" className="rounded-full bg-ink-700 py-4 text-center text-sm font-bold uppercase">
          Inicio
        </Link>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-ink-800 p-5">
      <p className="text-xs uppercase tracking-wide text-mute">{label}</p>
      <p className="font-display text-5xl uppercase">{value}</p>
    </div>
  )
}
