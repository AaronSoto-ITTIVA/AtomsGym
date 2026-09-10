import { Link, useParams } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { FavoriteButton } from '../components/FavoriteButton'
import { ExerciseMedia } from '../components/ExerciseMedia'
import { ExerciseCard } from '../components/Cards'
import { equipmentById } from '../data/equipment'
import { exercisesForEquipment } from '../lib/catalog'

export function EquipmentDetailPage() {
  const { id = '' } = useParams()
  const item = equipmentById[id]
  const list = item ? exercisesForEquipment(item.id) : []

  if (!item) {
    return <div className="px-4 py-10">Máquina no encontrada.</div>
  }

  return (
    <div className="safe-bottom">
      <TopBar backTo="/equipment" />
      <div className="h-56">
        <ExerciseMedia
          src={item.image}
          alt={item.name}
          pattern={item.id === 'bodyweight' ? 'lunge' : 'press-h'}
          title={item.name}
          muscle={item.primaryMuscles[0]}
          compact
        />
      </div>
      <div className="space-y-5 px-4 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">{item.category}</p>
            <h1 className="mt-1 font-display text-[2.15rem] font-bold uppercase">{item.name}</h1>
          </div>
          <FavoriteButton kind="equipment" id={item.id} />
        </div>
        <p className="text-sm leading-relaxed text-mute-strong">{item.description}</p>
        <section>
          <h2 className="mb-2 font-display text-xl uppercase">Trabaja principalmente</h2>
          <p className="text-sm">{item.primaryMuscles.join(' / ')}</p>
        </section>
        <section className="space-y-3">
          <h2 className="font-display text-xl uppercase">Ejercicios</h2>
          {list.length === 0 ? (
            <p className="text-sm text-mute">Aún no hay ejercicios ligados a esta máquina.</p>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {list.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))}
            </div>
          )}
        </section>
        <Link to={`/qr?target=/equipment/${item.id}`} className="block rounded-full bg-ink-700 py-3 text-center text-sm font-bold uppercase tracking-wide">
          QR de esta máquina
        </Link>
      </div>
    </div>
  )
}
