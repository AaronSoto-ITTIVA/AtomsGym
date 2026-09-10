import { StrictMode, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { BASENAME } from './config'
import { LevelContext, readStoredLevel, storeLevel } from './lib/level'
import type { Level } from './types'
import './index.css'

function Root() {
  const [level, setLevelState] = useState<Level>(readStoredLevel)
  const value = useMemo(
    () => ({
      level,
      setLevel: (next: Level) => {
        setLevelState(next)
        storeLevel(next)
      },
    }),
    [level],
  )

  return (
    <LevelContext.Provider value={value}>
      <BrowserRouter basename={BASENAME}>
        <App />
      </BrowserRouter>
    </LevelContext.Provider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
