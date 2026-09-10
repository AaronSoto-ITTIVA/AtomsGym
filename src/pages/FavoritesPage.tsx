import { useMemo, useState } from 'react'
import { TopBar } from '../components/TopBar'
import { RoutineCard, ExerciseCard, EquipmentCard } from '../components/Cards'
import { getFavorites } from '../lib/favorites'
import { routinesById } from '../data/routines'
import { exercisesById } from '../data/exercises'
import { equipmentById } from '../data/equipment'

export function FavoritesPage() {
  const [tick, setTick] = useState(0)
  const favs = useMemo(() => {
    void tick
    return getFavorites()
  }, [tick])

  const routineList = favs.routine.map((id) => routinesById[id]).filter(Boolean)
  const exerciseList = favs.exercise.map((id) => exercisesById[id]).filter(Boolean)
  const equipmentList = favs.equipment.map((id) => equipmentById[id]).filter(Boolean)
  const empty = !routineList.length && !exerciseList.length && !equipmentList.length

  return (
    <div className="safe-bottom" onFocus={() => setTick((n) => n + 1)}>
      <TopBar title="Favoritos" />
      <div className="space-y-6 px-4">
        {empty && <p className="text-sm text-mute">Marca rutinas, ejercicios o máquinas para verlos aquí.</p>}
        {routineList.length > 0 && (
          <section className="space-y-3">
            <h2 className="font-display text-2xl uppercase">Rutinas</h2>
            {routineList.map((routine) => (
              <RoutineCard key={routine.id} routine={routine} />
            ))}
          </section>
        )}
        {exerciseList.length > 0 && (
          <section className="space-y-3">
            <h2 className="font-display text-2xl uppercase">Ejercicios</h2>
            <div className="grid grid-cols-2 gap-3">
              {exerciseList.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))}
            </div>
          </section>
        )}
        {equipmentList.length > 0 && (
          <section className="space-y-3">
            <h2 className="font-display text-2xl uppercase">Máquinas</h2>
            <div className="grid grid-cols-2 gap-3">
              {equipmentList.map((item) => (
                <EquipmentCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
