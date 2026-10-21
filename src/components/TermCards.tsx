import type { Term } from '../data/terms'

export function TermCard({ term }: { term: Term }) {
  return (
    <article className="rounded-3xl bg-ink-800 p-4">
      <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-gold">
        {term.group === 'tecnica' ? 'Técnica' : 'Término'}
      </p>
      <h3 className="mt-1 font-display text-xl font-bold uppercase">{term.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-mute-strong">{term.meaning}</p>
      <p className="mt-2 text-sm leading-relaxed text-white/80">{term.how}</p>
    </article>
  )
}
