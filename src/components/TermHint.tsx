import { useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'
import { CircleAlert } from 'lucide-react'
import type { Term } from '../data/terms'

export function TermHint({
  terms,
  label = 'Qué significa',
  className = '',
}: {
  terms: Term[]
  label?: string
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const titleId = useId()

  if (!terms.length) return null

  return (
    <>
      <button
        type="button"
        aria-label={label}
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          setOpen(true)
        }}
        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border border-gold/50 bg-gold/15 text-gold ${className}`}
      >
        <CircleAlert size={14} strokeWidth={2.5} />
      </button>
      {open ? <TermPopup terms={terms} titleId={titleId} onClose={() => setOpen(false)} /> : null}
    </>
  )
}

function TermPopup({
  terms,
  titleId,
  onClose,
}: {
  terms: Term[]
  titleId: string
  onClose: () => void
}) {
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-lg rounded-3xl bg-ink-800 p-5 shadow-glow"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-gold">Qué significa</p>
        <div id={titleId} className="mt-3 space-y-4">
          {terms.map((term) => (
            <div key={term.id}>
              <h3 className="font-display text-2xl font-bold uppercase">{term.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute-strong">{term.meaning}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/85">{term.how}</p>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-full bg-gold py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-ink-950"
        >
          Entendido
        </button>
      </div>
    </div>,
    document.body,
  )
}
