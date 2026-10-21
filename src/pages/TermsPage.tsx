import { useEffect } from 'react'
import { TopBar } from '../components/TopBar'
import { TermCard } from '../components/TermCards'
import { trainingTerms } from '../data/terms'

const groups = [
  { id: 'base', title: 'Cómo leer la rutina', items: trainingTerms.filter((term) => term.group === 'base') },
  { id: 'tecnica', title: 'Técnicas avanzadas', items: trainingTerms.filter((term) => term.group === 'tecnica') },
] as const

export function TermsPage() {
  useEffect(() => {
    const id = window.location.hash.replace('#', '')
    if (!id) return
    document.getElementById(id)?.scrollIntoView({ block: 'start' })
  }, [])

  return (
    <div className="safe-bottom">
      <TopBar title="Términos" backTo="/" />
      <div className="space-y-6 px-4">
        <p className="text-sm leading-relaxed text-mute-strong">
          Palabras del gym, no del ejercicio. Si en la ficha dice dropset o rest-pause, aquí está qué hacer en el piso.
        </p>
        {groups.map((group) => (
          <section key={group.id} className="space-y-3">
            <h2 className="font-display text-2xl uppercase">{group.title}</h2>
            {group.items.map((term) => (
              <div key={term.id} id={term.id}>
                <TermCard term={term} />
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  )
}
