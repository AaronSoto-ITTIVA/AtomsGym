import { type ReactNode, useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'
import { Images } from 'lucide-react'
import type { Exercise } from '../types'
import { exerciseOverviewSrc, exerciseStepSrcs } from '../lib/catalog'
import { assetUrl } from '../config'
import { ExerciseMedia } from './ExerciseMedia'

export function ExerciseSteps({ exercise }: { exercise: Exercise }) {
  return (
    <>
      {exerciseStepSrcs(exercise.image).map((src, index) => (
        <figure key={src} className="overflow-hidden rounded-3xl bg-[#0a0a0c]">
          <img src={assetUrl(src)} alt={`${exercise.name} · paso ${index + 1}`} className="w-full object-contain" />
          {exercise.instructions[index] ? (
            <figcaption className="px-4 py-3 text-sm leading-relaxed text-mute-strong">
              <span className="mr-2 font-extrabold text-gold">{index + 1}.</span>
              {exercise.instructions[index]}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </>
  )
}

export function ExercisePreviewButton({
  exercise,
  className = '',
  children,
}: {
  exercise: Exercise
  className?: string
  children?: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const titleId = useId()

  return (
    <>
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          setOpen(true)
        }}
        className={
          children
            ? className
            : `inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink-700 py-3.5 text-sm font-extrabold uppercase tracking-[0.14em] ${className}`
        }
      >
        {children ?? (
          <>
            <Images size={18} strokeWidth={2.4} />
            Ver ejercicio
          </>
        )}
      </button>
      {open ? <ExercisePreviewDialog exercise={exercise} titleId={titleId} onClose={() => setOpen(false)} /> : null}
    </>
  )
}

function ExercisePreviewDialog({
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
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-gold">Ejercicio</p>
            <h3 id={titleId} className="mt-1 font-display text-xl font-bold uppercase leading-tight">
              {exercise.name}
            </h3>
          </div>
          <button type="button" onClick={onClose} className="text-sm font-semibold text-mute">
            Cerrar
          </button>
        </div>
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 pb-4">
          <div className="h-52 overflow-hidden rounded-3xl bg-[#0a0a0c]">
            <ExerciseMedia
              src={exerciseOverviewSrc(exercise.image)}
              alt={exercise.name}
              pattern={exercise.pattern}
              title={exercise.name}
              muscle={exercise.muscleGroup}
              compact
            />
          </div>
          <ExerciseSteps exercise={exercise} />
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
