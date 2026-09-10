import { Link } from 'react-router-dom'
import { muscleCategories, routines } from '../data/routines'
import { TopBar } from '../components/TopBar'
import { LevelSwitch } from '../components/LevelSwitch'
import { RoutineCard } from '../components/Cards'
import { muscleTone } from '../lib/search'
import { APP_TAGLINE } from '../config'

const featured = routines.filter((routine) => routine.featured)

export function HomePage() {
  return (
    <div className="safe-bottom">
      <TopBar />
      <div className="space-y-6 px-4">
        <section>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">{APP_TAGLINE}</p>
          <h1 className="mt-2 font-display text-[2.15rem] font-bold uppercase">
            ¿Qué vas a entrenar hoy?
          </h1>
        </section>

        <LevelSwitch />

        <section className="space-y-3">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-xl font-bold uppercase">Rutinas destacadas</h2>
            <Link to="/routines" className="text-sm font-semibold text-gold">
              Ver todas
            </Link>
          </div>
          <div className="no-scrollbar flex snap-x gap-3 overflow-x-auto pb-2">
            {featured.map((routine) => (
              <RoutineCard key={routine.id} routine={routine} />
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-bold uppercase">Grupos musculares</h2>
          <div className="grid grid-cols-2 gap-2">
            {muscleCategories.map((group) => (
              <Link
                key={group}
                to={`/routines?group=${encodeURIComponent(group)}`}
                className="rounded-3xl bg-ink-800 px-4 py-5"
              >
                <span className="mb-3 block h-2 w-8 rounded-full" style={{ background: muscleTone[group] }} />
                <span className="block text-[0.95rem] font-extrabold uppercase tracking-[0.14em]">{group}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
