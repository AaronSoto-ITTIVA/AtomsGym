import { mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function idsFrom(file, kind) {
  const text = readFileSync(join(root, file), 'utf8')
  const re = kind === 'id' ? /id: '([^']+)'/g : /image: '\/(exercises|equipment|routines)\/([^']+)'/g
  const ids = []
  let match
  if (kind === 'id') {
    while ((match = re.exec(text))) ids.push(match[1])
    return ids
  }
  while ((match = re.exec(text))) ids.push({ folder: match[1], file: match[2] })
  return ids
}

function svg({ title, subtitle, accent }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#16161a"/>
      <stop offset="100%" stop-color="#070708"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#g)"/>
  <circle cx="640" cy="90" r="160" fill="${accent}" fill-opacity="0.14"/>
  <circle cx="120" cy="420" r="120" fill="${accent}" fill-opacity="0.1"/>
  <rect x="80" y="70" width="90" height="10" rx="5" fill="${accent}"/>
  <text x="80" y="230" fill="#f4f4f5" font-family="Arial Black, Impact, sans-serif" font-size="48">${escapeXml(title)}</text>
  <text x="80" y="280" fill="${accent}" font-family="Arial, sans-serif" font-size="22">${escapeXml(subtitle)}</text>
  <text x="80" y="440" fill="#9b9ba6" font-family="Arial, sans-serif" font-size="16">Placeholder — sustituye este archivo por un GIF o foto real</text>
</svg>`
}

function escapeXml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const accents = ['#d6ff3f', '#ff6b4a', '#4ac8ff', '#ff4d8d', '#c084fc', '#facc15', '#fb923c', '#38bdf8']

const files = [
  ...idsFrom('src/data/exercises.ts', 'image'),
  ...idsFrom('src/data/equipment.ts', 'image'),
  ...idsFrom('src/data/routines.ts', 'image'),
]

for (const item of files) {
  const dir = join(root, 'public', item.folder)
  mkdirSync(dir, { recursive: true })
  const title = item.file.replace(/\.svg$/, '').replace(/-/g, ' ')
  const accent = accents[title.length % accents.length]
  writeFileSync(join(dir, item.file), svg({ title: title.toUpperCase(), subtitle: item.folder, accent }))
}

writeFileSync(
  join(root, 'public/exercises/README.txt'),
  'Sustituye cada .svg por un GIF o imagen real con el mismo nombre de archivo.\n',
)
writeFileSync(
  join(root, 'public/equipment/README.txt'),
  'Sustituye cada .svg por una foto de la máquina con el mismo nombre de archivo.\n',
)
writeFileSync(
  join(root, 'public/routines/README.txt'),
  'Sustituye cada .svg por una imagen de portada de rutina con el mismo nombre de archivo.\n',
)

console.log(`Generated ${files.length} placeholder SVGs`)
