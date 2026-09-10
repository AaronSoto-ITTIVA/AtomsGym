export const APP_NAME = "ATOM'S GYM"
export const APP_SHORT_NAME = 'ATOM´S'
export const APP_TAGLINE = 'Acondicionamiento físico · Entrenamiento'

export const BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '')

export function assetUrl(path: string) {
  const clean = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${clean}`
}

export function appOrigin() {
  if (import.meta.env.VITE_APP_URL) {
    return import.meta.env.VITE_APP_URL.replace(/\/$/, '')
  }
  return `${window.location.origin}${BASENAME}`
}

export function appUrl(path = '/') {
  const suffix = path.startsWith('/') ? path : `/${path}`
  return `${appOrigin()}${suffix}`
}
