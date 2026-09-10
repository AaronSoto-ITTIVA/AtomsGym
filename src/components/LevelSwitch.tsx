import { LEVELS } from '../lib/search'
import { useLevel } from '../lib/level'
import { levelMeta } from '../lib/levels'
import type { Level } from '../types'

export function LevelSwitch({ showHint = true }: { showHint?: boolean }) {
  const { level, setLevel } = useLevel()
  const meta = levelMeta[level]

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-1 rounded-2xl bg-ink-800 p-1">
        {LEVELS.map((item) => {
          const active = level === item
          const info = levelMeta[item as Level]
          return (
            <button
              key={item}
              type="button"
              onClick={() => setLevel(item as Level)}
              className="rounded-xl px-1 py-2.5 text-center transition-colors"
              style={
                active
                  ? { background: info.color, color: info.text }
                  : { color: '#9b9ba6' }
              }
            >
              <span className="block text-[10px] font-extrabold uppercase tracking-[0.08em]">{info.label}</span>
              <span className="mt-1 flex justify-center gap-0.5">
                {[1, 2, 3].map((pip) => (
                  <span
                    key={pip}
                    className="h-1 w-2.5 rounded-full"
                    style={{
                      background: pip <= info.intensity ? (active ? info.text : info.color) : active ? 'rgba(0,0,0,0.18)' : '#3a3338',
                    }}
                  />
                ))}
              </span>
            </button>
          )
        })}
      </div>
      {showHint && (
        <div className="rounded-2xl px-4 py-3" style={{ background: `${meta.color}22`, border: `1px solid ${meta.color}55` }}>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.16em]" style={{ color: meta.color }}>
            {meta.label} · {meta.focus}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-mute-strong">{meta.blurb}</p>
        </div>
      )}
    </div>
  )
}

export function IntensityPips({ level, className = '' }: { level: Level; className?: string }) {
  const meta = levelMeta[level]
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`}>
      {[1, 2, 3].map((pip) => (
        <span
          key={pip}
          className="h-1.5 w-3 rounded-full"
          style={{ background: pip <= meta.intensity ? meta.color : '#3a3338' }}
        />
      ))}
    </span>
  )
}
