import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { searchAll } from '../lib/search'

const labels = {
  routine: 'Rutinas',
  exercise: 'Ejercicios',
  equipment: 'Máquinas',
} as const

export function SearchPage() {
  const [query, setQuery] = useState('')
  const hits = useMemo(() => searchAll(query), [query])
  const groups = (['exercise', 'equipment', 'routine'] as const).map((kind) => ({
    kind,
    items: hits.filter((hit) => hit.kind === kind),
  }))

  return (
    <div className="safe-bottom">
      <TopBar title="Buscar" backTo="/" />
      <div className="space-y-5 px-4">
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder='Busca "remo", "prensa", "pull"...'
          className="w-full rounded-2xl border border-white/10 bg-ink-800 px-4 py-4 text-base outline-none placeholder:text-mute focus:border-gold"
        />
        {!query && <p className="text-sm text-mute">Encuentra rutinas, ejercicios y máquinas del gimnasio.</p>}
        {query && hits.length === 0 && <p className="text-sm text-mute">Sin resultados para “{query}”.</p>}
        {groups.map(
          (group) =>
            group.items.length > 0 && (
              <section key={group.kind} className="space-y-2">
                <h2 className="font-display text-2xl uppercase">{labels[group.kind]}</h2>
                {group.items.map((hit) => (
                  <Link key={hit.id} to={hit.to} className="block rounded-2xl bg-ink-800 px-4 py-3">
                    <p className="font-display text-lg font-bold uppercase">{hit.title}</p>
                    <p className="mt-1 text-xs text-mute">{hit.subtitle}</p>
                  </Link>
                ))}
              </section>
            ),
        )}
      </div>
    </div>
  )
}
