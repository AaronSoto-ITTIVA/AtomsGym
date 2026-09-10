import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { muscleCategories, routines } from '../data/routines'
import { TopBar } from '../components/TopBar'
import { LevelSwitch } from '../components/LevelSwitch'
import { RoutineCard } from '../components/Cards'
import type { MuscleGroup } from '../types'

export function RoutinesPage() {
  const [params, setParams] = useSearchParams()
  const group = params.get('group')

  const list = useMemo(() => {
    if (!group) return routines
    return routines.filter(
      (routine) => routine.muscles.includes(group as MuscleGroup) || routine.focus === group,
    )
  }, [group])

  return (
    <div className="safe-bottom">
      <TopBar title="Rutinas" />
      <div className="space-y-4 px-4">
        <LevelSwitch />
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          <FilterChip label="Todas" active={!group} onClick={() => setParams({})} />
          {muscleCategories.map((item) => (
            <FilterChip
              key={item}
              label={item}
              active={group === item}
              onClick={() => setParams({ group: item })}
            />
          ))}
        </div>
        <div className="grid gap-3">
          {list.map((routine) => (
            <RoutineCard key={routine.id} routine={routine} />
          ))}
        </div>
      </div>
    </div>
  )
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide ${
        active ? 'bg-gold text-ink-950' : 'bg-ink-800 text-mute'
      }`}
    >
      {label}
    </button>
  )
}
