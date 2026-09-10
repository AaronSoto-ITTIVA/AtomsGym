import { Outlet, useLocation } from 'react-router-dom'
import { BottomNav } from './BottomNav'

export function AppShell() {
  const { pathname } = useLocation()
  const hideNav = pathname.startsWith('/workout')

  return (
    <div className="mx-auto min-h-dvh max-w-lg bg-ink-950">
      <Outlet />
      {!hideNav && <BottomNav />}
    </div>
  )
}
