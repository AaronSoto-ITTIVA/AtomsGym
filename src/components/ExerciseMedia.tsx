import type { MovementPattern } from '../types'
import { assetUrl } from '../config'
import { muscleTone } from '../lib/search'
import { useState } from 'react'

const raster = /\.(gif|png|jpe?g|webp)$/i

export function ExerciseMedia({
  src,
  alt,
  pattern,
  title,
  muscle,
  className = '',
  compact = false,
}: {
  src: string
  alt: string
  pattern: MovementPattern
  title: string
  muscle: string
  className?: string
  compact?: boolean
}) {
  const [failed, setFailed] = useState(false)
  const showImage = raster.test(src) && !failed

  if (showImage) {
    return (
      <img
        src={assetUrl(src)}
        alt={alt}
        className={`h-full w-full object-cover ${className}`}
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <MovementScene
      pattern={pattern}
      title={title}
      muscle={muscle}
      className={className}
      compact={compact}
    />
  )
}

export function MovementScene({
  pattern,
  title,
  muscle,
  className = '',
  compact = false,
}: {
  pattern: MovementPattern
  title: string
  muscle: string
  className?: string
  compact?: boolean
}) {
  const tone = muscleTone[muscle] ?? '#fcbc10'

  return (
    <div className={`scene relative flex h-full min-h-[160px] flex-col ${compact ? 'p-3' : 'p-4'} ${className}`}>
      <div className="scene-grid" />
      {!compact && (
        <div className="relative z-10 mb-2">
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ color: tone, background: 'rgba(0,0,0,0.28)' }}
          >
            Demo
          </span>
        </div>
      )}
      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center">
        <DemoFigure pattern={pattern} accent={tone} />
      </div>
      {!compact && (
        <div className="relative z-10 mt-2">
          <p className="font-display text-xl font-bold uppercase leading-snug tracking-[0.08em]">{title}</p>
          <p className="mt-1 text-xs font-medium tracking-wide text-mute">{muscle}</p>
        </div>
      )}
    </div>
  )
}

function DemoFigure({ pattern, accent }: { pattern: MovementPattern; accent: string }) {
  return (
    <svg viewBox="0 0 220 180" className={`demo-fig demo-${pattern} h-full w-full max-h-[11rem]`}>
      {pattern === 'press-h' && <PressH accent={accent} />}
      {pattern === 'press-v' && <PressV accent={accent} />}
      {pattern === 'pull-h' && <PullH accent={accent} />}
      {pattern === 'pull-v' && <PullV accent={accent} />}
      {pattern === 'squat' && <Squat accent={accent} />}
      {pattern === 'hinge' && <Hinge accent={accent} />}
      {pattern === 'curl' && <Curl accent={accent} />}
      {pattern === 'extension' && <Extension accent={accent} />}
      {pattern === 'fly' && <Fly accent={accent} />}
      {pattern === 'open' && <Open accent={accent} />}
      {pattern === 'raise' && <Raise accent={accent} />}
      {pattern === 'kickback' && <Kickback accent={accent} />}
      {pattern === 'lunge' && <Lunge accent={accent} />}
      {pattern === 'core' && <CoreHold accent={accent} />}
      {pattern === 'cardio' && <Cardio accent={accent} />}
    </svg>
  )
}

function Head({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r="11" fill="#efe8e0" />
}

function PressH({ accent }: { accent: string }) {
  return (
    <g>
      <rect x="48" y="118" width="124" height="10" rx="3" fill="#4a4146" />
      <rect x="58" y="92" width="104" height="28" rx="4" fill="#2f292d" />
      <g className="move">
        <Head x={110} y={58} />
        <rect x="97" y="70" width="26" height="36" rx="8" fill="#efe8e0" />
        <rect className="arm-l" x="64" y="78" width="36" height="9" rx="4" fill="#efe8e0" />
        <rect className="arm-r" x="120" y="78" width="36" height="9" rx="4" fill="#efe8e0" />
        <rect x="46" y="72" width="128" height="7" rx="3" fill={accent} />
        <circle cx="46" cy="75" r="9" fill={accent} />
        <circle cx="174" cy="75" r="9" fill={accent} />
      </g>
    </g>
  )
}

function PressV({ accent }: { accent: string }) {
  return (
    <g className="move">
      <Head x={110} y={42} />
      <rect x="97" y="54" width="26" height="52" rx="8" fill="#efe8e0" />
      <rect x="92" y="106" width="14" height="42" rx="6" fill="#efe8e0" />
      <rect x="114" y="106" width="14" height="42" rx="6" fill="#efe8e0" />
      <g className="lift">
        <rect x="78" y="36" width="12" height="34" rx="5" fill="#efe8e0" />
        <rect x="130" y="36" width="12" height="34" rx="5" fill="#efe8e0" />
        <rect x="62" y="28" width="96" height="7" rx="3" fill={accent} />
        <circle cx="62" cy="31" r="8" fill={accent} />
        <circle cx="158" cy="31" r="8" fill={accent} />
      </g>
    </g>
  )
}

function PullH({ accent }: { accent: string }) {
  return (
    <g>
      <rect x="36" y="128" width="70" height="12" rx="3" fill="#4a4146" />
      <g className="move">
        <Head x={86} y={58} />
        <rect x="74" y="70" width="24" height="48" rx="8" transform="rotate(-18 86 94)" fill="#efe8e0" />
        <rect x="92" y="108" width="14" height="36" rx="6" fill="#efe8e0" />
        <rect x="70" y="112" width="14" height="32" rx="6" fill="#efe8e0" />
        <g className="row">
          <rect x="108" y="86" width="52" height="9" rx="4" fill="#efe8e0" />
          <rect x="154" y="82" width="10" height="44" rx="3" fill={accent} />
        </g>
      </g>
    </g>
  )
}

function PullV({ accent }: { accent: string }) {
  return (
    <g>
      <rect x="40" y="28" width="140" height="8" rx="3" fill={accent} />
      <g className="move climb">
        <rect x="78" y="32" width="10" height="36" rx="4" fill="#efe8e0" />
        <rect x="132" y="32" width="10" height="36" rx="4" fill="#efe8e0" />
        <Head x={110} y={78} />
        <rect x="97" y="90" width="26" height="40" rx="8" fill="#efe8e0" />
        <rect x="92" y="128" width="13" height="28" rx="5" fill="#efe8e0" />
        <rect x="115" y="128" width="13" height="28" rx="5" fill="#efe8e0" />
      </g>
    </g>
  )
}

function Squat({ accent }: { accent: string }) {
  return (
    <g className="move dip">
      <rect x="58" y="46" width="104" height="7" rx="3" fill={accent} />
      <circle cx="58" cy="49" r="8" fill={accent} />
      <circle cx="162" cy="49" r="8" fill={accent} />
      <Head x={110} y={38} />
      <rect x="97" y="50" width="26" height="46" rx="8" fill="#efe8e0" />
      <rect x="90" y="94" width="14" height="44" rx="6" fill="#efe8e0" />
      <rect x="116" y="94" width="14" height="44" rx="6" fill="#efe8e0" />
    </g>
  )
}

function Hinge({ accent }: { accent: string }) {
  return (
    <g className="move hinge">
      <Head x={92} y={46} />
      <rect x="80" y="58" width="24" height="50" rx="8" transform="rotate(28 92 83)" fill="#efe8e0" />
      <rect x="98" y="108" width="14" height="38" rx="6" fill="#efe8e0" />
      <rect x="76" y="112" width="14" height="34" rx="6" fill="#efe8e0" />
      <rect x="108" y="96" width="70" height="7" rx="3" fill={accent} />
      <circle cx="178" cy="99" r="9" fill={accent} />
    </g>
  )
}

function Curl({ accent }: { accent: string }) {
  return (
    <g>
      <Head x={110} y={36} />
      <rect x="97" y="48" width="26" height="54" rx="8" fill="#efe8e0" />
      <rect x="90" y="100" width="14" height="44" rx="6" fill="#efe8e0" />
      <rect x="116" y="100" width="14" height="44" rx="6" fill="#efe8e0" />
      <g className="move curl">
        <rect x="70" y="62" width="12" height="36" rx="5" fill="#efe8e0" />
        <rect x="138" y="62" width="12" height="36" rx="5" fill="#efe8e0" />
        <circle cx="76" cy="104" r="10" fill={accent} />
        <circle cx="144" cy="104" r="10" fill={accent} />
      </g>
    </g>
  )
}

function Extension({ accent }: { accent: string }) {
  return (
    <g>
      <rect x="168" y="24" width="10" height="120" rx="3" fill="#4a4146" />
      <Head x={110} y={42} />
      <rect x="97" y="54" width="26" height="50" rx="8" fill="#efe8e0" />
      <rect x="90" y="104" width="14" height="40" rx="6" fill="#efe8e0" />
      <rect x="116" y="104" width="14" height="40" rx="6" fill="#efe8e0" />
      <g className="move push">
        <rect x="128" y="60" width="40" height="9" rx="4" fill="#efe8e0" />
        <rect x="160" y="48" width="8" height="70" rx="3" fill={accent} />
      </g>
    </g>
  )
}

function Fly({ accent }: { accent: string }) {
  return (
    <g>
      <rect x="58" y="112" width="104" height="10" rx="3" fill="#4a4146" />
      <g className="move fly">
        <Head x={110} y={52} />
        <rect x="97" y="64" width="26" height="38" rx="8" fill="#efe8e0" />
        <rect x="52" y="74" width="48" height="9" rx="4" fill="#efe8e0" />
        <rect x="120" y="74" width="48" height="9" rx="4" fill="#efe8e0" />
        <circle cx="48" cy="78" r="9" fill={accent} />
        <circle cx="172" cy="78" r="9" fill={accent} />
      </g>
    </g>
  )
}

function Open({ accent }: { accent: string }) {
  return (
    <g>
      <rect x="70" y="108" width="80" height="18" rx="8" fill="#2f292d" />
      <Head x={110} y={40} />
      <rect x="97" y="52" width="26" height="44" rx="8" fill="#efe8e0" />
      <g className="move open">
        <rect x="62" y="92" width="36" height="12" rx="6" fill="#efe8e0" />
        <rect x="122" y="92" width="36" height="12" rx="6" fill="#efe8e0" />
        <circle cx="62" cy="98" r="8" fill={accent} />
        <circle cx="158" cy="98" r="8" fill={accent} />
      </g>
    </g>
  )
}

function Raise({ accent }: { accent: string }) {
  return (
    <g>
      <Head x={110} y={40} />
      <rect x="97" y="52" width="26" height="52" rx="8" fill="#efe8e0" />
      <rect x="90" y="104" width="14" height="40" rx="6" fill="#efe8e0" />
      <rect x="116" y="104" width="14" height="40" rx="6" fill="#efe8e0" />
      <g className="move raise">
        <rect x="58" y="68" width="40" height="9" rx="4" fill="#efe8e0" />
        <rect x="122" y="68" width="40" height="9" rx="4" fill="#efe8e0" />
        <circle cx="54" cy="72" r="8" fill={accent} />
        <circle cx="166" cy="72" r="8" fill={accent} />
      </g>
    </g>
  )
}

function Lunge({ accent }: { accent: string }) {
  return (
    <g>
      <ellipse cx="110" cy="160" rx="58" ry="8" fill="#2f292d" />
      <g className="move lunge">
        <Head x={122} y={36} />
        <rect x="109" y="48" width="24" height="44" rx="8" fill="#efe8e0" />
        <rect x="114" y="86" width="14" height="40" rx="6" transform="rotate(22 121 86)" fill="#efe8e0" />
        <rect x="132" y="118" width="13" height="34" rx="6" fill="#efe8e0" />
        <rect x="76" y="92" width="40" height="12" rx="6" fill="#efe8e0" />
        <rect className="back-shin" x="60" y="102" width="12" height="42" rx="6" fill="#efe8e0" />
        <circle cx="138" cy="154" r="8" fill={accent} />
        <circle cx="66" cy="146" r="8" fill={accent} />
      </g>
    </g>
  )
}

function CoreHold({ accent }: { accent: string }) {
  return (
    <g>
      <ellipse cx="110" cy="158" rx="72" ry="8" fill="#2f292d" />
      <g className="move plank">
        <Head x={48} y={74} />
        <rect x="58" y="78" width="78" height="16" rx="8" transform="rotate(-10 97 86)" fill="#efe8e0" />
        <rect x="44" y="92" width="38" height="10" rx="5" fill="#efe8e0" />
        <rect x="124" y="96" width="13" height="42" rx="6" fill="#efe8e0" />
        <circle cx="42" cy="97" r="7" fill={accent} />
        <circle cx="130" cy="140" r="7" fill={accent} />
      </g>
    </g>
  )
}

function Kickback({ accent }: { accent: string }) {
  return (
    <g>
      <rect x="40" y="28" width="12" height="120" rx="3" fill="#4a4146" />
      <Head x={78} y={50} />
      <rect x="66" y="62" width="24" height="46" rx="8" transform="rotate(12 78 85)" fill="#efe8e0" />
      <rect x="72" y="108" width="13" height="36" rx="6" fill="#efe8e0" />
      <g className="move kick">
        <rect x="96" y="96" width="54" height="11" rx="5" fill="#efe8e0" />
        <circle cx="154" cy="101" r="8" fill={accent} />
      </g>
    </g>
  )
}

function Cardio({ accent }: { accent: string }) {
  return (
    <g className="move run">
      <ellipse cx="110" cy="148" rx="54" ry="8" fill="#2f292d" />
      <circle cx="86" cy="128" r="18" fill="none" stroke={accent} strokeWidth="6" />
      <circle cx="138" cy="128" r="18" fill="none" stroke={accent} strokeWidth="6" />
      <Head x={118} y={48} />
      <rect x="104" y="60" width="22" height="42" rx="7" fill="#efe8e0" />
      <rect className="leg-a" x="102" y="100" width="11" height="30" rx="5" fill="#efe8e0" />
      <rect className="leg-b" x="124" y="100" width="11" height="30" rx="5" fill="#efe8e0" />
    </g>
  )
}
