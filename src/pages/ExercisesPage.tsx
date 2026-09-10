import { useMemo, useState } from 'react'
import { exercises } from '../data/exercises'
import { equipment } from '../data/equipment'
import { muscleCategories } from '../data/routines'
import { TopBar } from '../components/TopBar'
import { ExerciseCard } from '../components/Cards'
import type { Difficulty } from '../types'

const difficulties: Array<Difficulty | 'Todas'> = ['Todas', 'Principiante', 'Intermedio', 'Avanzado']

export function ExercisesPage() {
  const [muscle, setMuscle] = useState('Todas')
  const [machine, setMachine] = useState('Todas')
  const [difficulty, setDifficulty] = useState<(typeof difficulties)[number]>('Todas')

  const list = useMemo(() => {
    return exercises.filter((exercise) => {
      const muscleOk = muscle === 'Todas' || exercise.muscleGroup === muscle
      const machineOk =
        machine === 'Todas' || exercise.equipmentId === machine || exercise.alsoUses?.includes(machine)
      const diffOk = difficulty === 'Todas' || exercise.difficulty === difficulty
      return muscleOk && machineOk && diffOk
    })
  }, [muscle, machine, difficulty])

  return (
    <div className="safe-bottom">
      <TopBar title="Ejercicios" />
      <div className="space-y-3 px-4">
        <FilterRow
          label="Músculo"
          value={muscle}
          options={['Todas', ...muscleCategories]}
          onChange={setMuscle}
        />
        <FilterRow
          label="Máquina"
          value={machine}
          options={['Todas', ...equipment.map((item) => item.id)]}
          labels={Object.fromEntries(equipment.map((item) => [item.id, item.name]))}
          onChange={setMachine}
        />
        <FilterRow label="Dificultad" value={difficulty} options={difficulties} onChange={(value) => setDifficulty(value as typeof difficulty)} />
        <div className="grid grid-cols-2 gap-3 pt-2">
          {list.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </div>
    </div>
  )
}

function FilterRow({
  label,
  value,
  options,
  labels,
  onChange,
}: {
  label: string
  value: string
  options: readonly string[]
  labels?: Record<string, string>
  onChange: (value: string) => void
}) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-mute">{label}</p>
      <div className="no-scrollbar flex gap-2 overflow-x-auto">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-bold ${
              value === option ? 'bg-gold text-ink-950' : 'bg-ink-800 text-mute'
            }`}
          >
            {labels?.[option] ?? option}
          </button>
        ))}
      </div>
    </div>
  )
}
