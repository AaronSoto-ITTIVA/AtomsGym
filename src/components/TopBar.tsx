import { QrCode, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BrandMark } from './BrandMark'

export function TopBar({ title, backTo }: { title?: string; backTo?: string }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 bg-ink-950/90 px-4 pb-3 pt-[max(0.9rem,env(safe-area-inset-top))] backdrop-blur-xl">
      {backTo ? (
        <Link to={backTo} className="text-sm font-semibold text-gold">
          Atrás
        </Link>
      ) : (
        <Link to="/" aria-label="ATOM'S GYM">
          <BrandMark />
        </Link>
      )}
      {title ? <h1 className="flex-1 truncate text-center font-display text-xl uppercase tracking-wide">{title}</h1> : <span />}
      <div className="flex items-center gap-2">
        <Link to="/search" className="grid h-10 w-10 place-items-center rounded-full bg-ink-700 text-white" aria-label="Buscar">
          <Search size={18} />
        </Link>
        <Link to="/qr" className="grid h-10 w-10 place-items-center rounded-full bg-ink-700 text-white" aria-label="Código QR">
          <QrCode size={18} />
        </Link>
      </div>
    </header>
  )
}
