import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { isFavorite, toggleFavorite } from '../lib/favorites'
import type { FavoriteKind } from '../types'

export function FavoriteButton({ kind, id }: { kind: FavoriteKind; id: string }) {
  const [on, setOn] = useState(false)

  useEffect(() => {
    setOn(isFavorite(kind, id))
  }, [kind, id])

  return (
    <button
      type="button"
      aria-label="Favorito"
      onClick={() => {
        toggleFavorite(kind, id)
        setOn((value) => !value)
      }}
      className={`grid h-11 w-11 place-items-center rounded-full ${on ? 'bg-brand-red text-white' : 'bg-ink-700 text-white'}`}
    >
      <Heart size={18} fill={on ? 'currentColor' : 'none'} />
    </button>
  )
}
