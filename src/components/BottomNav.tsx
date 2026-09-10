import { Dumbbell, Heart, Home, LayoutGrid, StretchHorizontal } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const items = [
  { to: '/', label: 'Inicio', icon: Home, end: true },
  { to: '/routines', label: 'Rutinas', icon: StretchHorizontal },
  { to: '/exercises', label: 'Ejercicios', icon: Dumbbell },
  { to: '/equipment', label: 'Máquinas', icon: LayoutGrid },
  { to: '/favorites', label: 'Favoritos', icon: Heart },
]

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-950/92 backdrop-blur-xl">
      <ul className="mx-auto grid max-w-lg grid-cols-5 px-2 pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-2">
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-2xl px-1 py-1.5 text-[10px] font-semibold uppercase tracking-wide ${
                  isActive ? 'text-gold' : 'text-mute'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon size={20} strokeWidth={isActive ? 2.4 : 1.8} />
                  {item.label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
