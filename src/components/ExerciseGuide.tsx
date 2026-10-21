import { useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'
import { BookOpen } from 'lucide-react'
import type { Exercise } from '../types'

export function ExerciseGuideButton({
  exercise,
  className = '',
  variant = 'full',
}: {
  exercise: Exercise
  className?: string
  variant?: 'full' | 'icon'
}) {
  const [open, setOpen] = useState(false)
  const titleId = useId()

  return (
    <>
      <button
        type="button"
        aria-label="Cómo se hace"
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          setOpen(true)
        }}
        className={
          variant === 'icon'
            ? `grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold text-ink-950 ${className}`
            : `inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-sm font-extrabold uppercase tracking-[0.14em] text-ink-950 ${className}`
        }
      >
        <BookOpen size={18} strokeWidth={2.4} />
        {variant === 'full' ? 'Cómo se hace' : null}
      </button>
      {open ? <ExerciseGuideDialog exercise={exercise} titleId={titleId} onClose={() => setOpen(false)} /> : null}
    </>
  )
}

function ExerciseGuideDialog({
  exercise,
  titleId,
  onClose,
}: {
  exercise: Exercise
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
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-3 sm:items-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/75" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[90dvh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-ink-800 shadow-glow"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 px-4 pb-2 pt-4">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-gold">Guía</p>
            <h3 id={titleId} className="mt-1 font-display text-xl font-bold uppercase leading-tight">
              {exercise.name}
            </h3>
          </div>
          <button type="button" onClick={onClose} className="text-sm font-semibold text-mute">
            Cerrar
          </button>
        </div>
        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 pb-4">
          <GuideBlock title="Posición inicial" items={exercise.startPosition} ordered />
          <GuideBlock title="Movimiento" items={exercise.movement} ordered />
          <section>
            <h4 className="mb-2 font-display text-xl uppercase">Respiración</h4>
            <p className="text-sm leading-relaxed text-mute-strong">{exercise.breathing}</p>
          </section>
          <GuideBlock title="Consejos" items={exercise.tips} />
          <GuideBlock title="Errores comunes" items={exercise.commonMistakes} />
        </div>
        <div className="px-4 pb-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full bg-gold py-3 text-sm font-extrabold uppercase tracking-[0.14em] text-ink-950"
          >
            Listo
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

function GuideBlock({ title, items, ordered }: { title: string; items: string[]; ordered?: boolean }) {
  const List = ordered ? 'ol' : 'ul'
  return (
    <section>
      <h4 className="mb-2 font-display text-xl uppercase">{title}</h4>
      <List className={`space-y-2 text-sm leading-relaxed text-mute-strong ${ordered ? 'list-decimal pl-5' : 'list-disc pl-5'}`}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </List>
    </section>
  )
}
