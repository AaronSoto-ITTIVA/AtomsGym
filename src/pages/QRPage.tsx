import { QRCodeSVG } from 'qrcode.react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TopBar } from '../components/TopBar'
import { appUrl } from '../config'
import { routines } from '../data/routines'
import { equipment } from '../data/equipment'

export function QRPage() {
  const [params] = useSearchParams()
  const preset = params.get('target') || '/'
  const [target, setTarget] = useState(preset)
  const url = useMemo(() => appUrl(target), [target])

  return (
    <div className="safe-bottom">
      <TopBar title="Código QR" backTo="/" />
      <div className="space-y-5 px-4">
        <p className="text-sm leading-relaxed text-mute-strong">
          Escanea para abrir ATOM'S GYM o una rutina / máquina concreta. Útil para pegar códigos en el gimnasio.
        </p>
        <div className="mx-auto w-fit rounded-3xl bg-white p-4">
          <QRCodeSVG value={url} size={220} includeMargin />
        </div>
        <p className="break-all text-center text-xs text-mute">{url}</p>
        <label className="block space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-mute">Destino</span>
          <select
            value={target}
            onChange={(event) => setTarget(event.target.value)}
            className="w-full rounded-2xl bg-ink-800 px-4 py-3 text-sm"
          >
            <option value="/">Aplicación completa</option>
            <optgroup label="Rutinas">
              {routines.map((routine) => (
                <option key={routine.id} value={`/routine/${routine.id}`}>
                  {routine.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Máquinas">
              {equipment.map((item) => (
                <option key={item.id} value={`/equipment/${item.id}`}>
                  {item.name}
                </option>
              ))}
            </optgroup>
          </select>
        </label>
      </div>
    </div>
  )
}
