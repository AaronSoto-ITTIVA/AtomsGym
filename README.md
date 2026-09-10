# ATOM'S GYM

App mobile-first del gimnasio ATOM'S GYM: rutinas precargadas, catálogo de ejercicios, máquinas reales, modo entrenamiento con temporizador y códigos QR.

Identidad tomada de la guía de marca: isotipo barra + A, Copperplate (titulares vía Cinzel), Avenir (texto vía Nunito Sans), oro `#fcbc10`, rojo `#ec2424`, negro `#201c20` y gris `#787c7c`.

Sin backend ni base de datos. Todo vive en TypeScript local.

## Arranque

```bash
cd forge-gym
npm install
npm run dev
```

La app vive en su propia carpeta: `C:\Proyectos_Trabajo\forge-gym` (fuera de Evaluación Jurídica).

Build de producción:

```bash
npm run build
npm run preview
```

## GitHub Pages

La app usa React Router. En un repo de proyecto (`usuario.github.io/forge-gym/`) hay que publicar con el `base` correcto:

1. Crea un repositorio llamado `forge-gym` (o cambia el nombre en el script `deploy` de `package.json` y en `--base`).
2. Sube este directorio.
3. En GitHub: Settings → Pages → Source: `gh-pages`.
4. Desde esta carpeta:

```bash
npm run deploy
```

Ese comando hace `vite build --base /forge-gym/` y publica la carpeta `dist`.

Si tu repo tiene **otro nombre**, cambia `/forge-gym/` en `package.json`:

```json
"deploy": "tsc --noEmit && vite build --base /TU-REPO/ && gh-pages -d dist"
```

`public/404.html` redirige las rutas profundas (`/routine/pull`, `/equipment/smith-machine`) hacia la SPA.

El QR en `/qr` usa la URL actual del sitio. Cuando esté publicado, apunta a GitHub Pages. También puedes fijar `VITE_APP_URL=https://usuario.github.io/forge-gym`.

## Estructura de datos

- `src/data/equipment.ts` — máquinas del gimnasio
- `src/data/exercises.ts` — ejercicios (instrucciones, errores, músculos)
- `src/data/routines.ts` — rutinas que referencian ejercicios por ID

Relaciones: `routine.exercises[].exerciseId` → ejercicio → `equipmentId`.

## Imágenes

Rutas listas para sustituir:

- `public/exercises/`
- `public/equipment/`
- `public/routines/`

Hoy hay SVG placeholder. Si dejas un `.gif`, `.jpg` o `.png` con el mismo nombre (cambiando también la extensión en los datos), la UI lo usa en lugar de la ilustración animada.

Regenerar placeholders:

```bash
node scripts/generate-placeholders.mjs
```

## Qué incluye la POC

- 13 rutinas (las 12 pedidas + Cardio) con nivel principiante / intermedio / avanzado
- Catálogo de ejercicios y máquinas del equipo real
- Buscador global
- Favoritos en `localStorage`
- Modo entrenamiento + temporizador de descanso
- QR de la app, de cada rutina y de cada máquina
- Barra inferior móvil: Inicio, Rutinas, Ejercicios, Máquinas, Favoritos

No incluye login, pagos, usuarios ni panel admin.
