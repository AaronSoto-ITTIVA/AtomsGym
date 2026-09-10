import { assetUrl } from '../config'

export function BrandMark({ size = 'nav' }: { size?: 'nav' | 'hero' }) {
  const hero = size === 'hero'

  return (
    <span className={`flex items-center ${hero ? 'gap-4' : 'gap-2.5'}`}>
      <img
        src={assetUrl('logo-mark-gold.png')}
        alt=""
        className={`w-auto shrink-0 object-contain object-center ${hero ? 'h-[4.5rem]' : 'h-12'}`}
      />
      <span className="min-w-0 leading-none">
        <span
          className={`block font-display font-bold uppercase text-white ${
            hero ? 'text-[1.85rem]' : 'whitespace-nowrap text-[1.05rem]'
          }`}
          style={{ letterSpacing: '0.16em' }}
        >
          ATOM'S GYM
        </span>
        {hero && (
          <span className="mt-1.5 block max-w-[16rem] text-[0.58rem] font-semibold uppercase leading-snug tracking-[0.22em] text-gold">
            Acondicionamiento físico · Entrenamiento
          </span>
        )}
      </span>
    </span>
  )
}
