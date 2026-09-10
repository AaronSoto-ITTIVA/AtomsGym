import type { Level, LevelPrescription, Routine, RoutineExercise } from '../types'

const hyper = (
  extra?: Partial<Record<Level, Partial<LevelPrescription>>>,
): Record<Level, LevelPrescription | null> => ({
  Principiante: { sets: 3, reps: '10-12', rest: 90, ...extra?.Principiante },
  Intermedio: { sets: 4, reps: '8-12', rest: 90, ...extra?.Intermedio },
  Avanzado: {
    sets: 4,
    reps: '8-10',
    rest: 75,
    technique: 'Dropset en la última serie',
    ...extra?.Avanzado,
  },
})

const compound = (
  extra?: Partial<Record<Level, Partial<LevelPrescription>>>,
): Record<Level, LevelPrescription | null> => ({
  Principiante: { sets: 3, reps: '8-10', rest: 120, ...extra?.Principiante },
  Intermedio: { sets: 4, reps: '6-10', rest: 120, ...extra?.Intermedio },
  Avanzado: { sets: 5, reps: '5-8', rest: 150, ...extra?.Avanzado },
})

const strength = (
  extra?: Partial<Record<Level, Partial<LevelPrescription>>>,
): Record<Level, LevelPrescription | null> => ({
  Principiante: { sets: 3, reps: '8', rest: 150, ...extra?.Principiante },
  Intermedio: { sets: 4, reps: '5-6', rest: 180, ...extra?.Intermedio },
  Avanzado: { sets: 5, reps: '3-5', rest: 180, ...extra?.Avanzado },
})

const isolation = (
  extra?: Partial<Record<Level, Partial<LevelPrescription>>>,
): Record<Level, LevelPrescription | null> => ({
  Principiante: { sets: 3, reps: '12-15', rest: 60, ...extra?.Principiante },
  Intermedio: { sets: 3, reps: '12-15', rest: 60, ...extra?.Intermedio },
  Avanzado: {
    sets: 4,
    reps: '10-15',
    rest: 45,
    technique: 'Rest-pause en la última serie',
    ...extra?.Avanzado,
  },
})

const skipBeginner = (
  base: Record<Level, LevelPrescription | null>,
): Record<Level, LevelPrescription | null> => ({
  ...base,
  Principiante: null,
})

const cardio = (minutes: string): Record<Level, LevelPrescription | null> => ({
  Principiante: { sets: 1, reps: minutes, rest: 0 },
  Intermedio: { sets: 1, reps: minutes, rest: 0 },
  Avanzado: { sets: 1, reps: minutes, rest: 0 },
})

const lunge = (
  extra?: Partial<Record<Level, Partial<LevelPrescription>>>,
): Record<Level, LevelPrescription | null> => ({
  Principiante: { sets: 3, reps: '10 por pierna', rest: 60, ...extra?.Principiante },
  Intermedio: { sets: 3, reps: '12 por pierna', rest: 60, ...extra?.Intermedio },
  Avanzado: { sets: 4, reps: '10-12 por pierna', rest: 45, ...extra?.Avanzado },
})

const bodywork = (
  extra?: Partial<Record<Level, Partial<LevelPrescription>>>,
): Record<Level, LevelPrescription | null> => ({
  Principiante: { sets: 3, reps: '10-12', rest: 60, ...extra?.Principiante },
  Intermedio: { sets: 3, reps: '12-15', rest: 45, ...extra?.Intermedio },
  Avanzado: { sets: 4, reps: 'Máximas con control', rest: 45, ...extra?.Avanzado },
})

const hold = (
  extra?: Partial<Record<Level, Partial<LevelPrescription>>>,
): Record<Level, LevelPrescription | null> => ({
  Principiante: { sets: 3, reps: '20-30 s', rest: 45, ...extra?.Principiante },
  Intermedio: { sets: 3, reps: '30-45 s', rest: 45, ...extra?.Intermedio },
  Avanzado: { sets: 4, reps: '45-60 s', rest: 30, ...extra?.Avanzado },
})

function slot(exerciseId: string, levels: Record<Level, LevelPrescription | null>): RoutineExercise {
  return { exerciseId, levels }
}

export const routines: Routine[] = [
  {
    id: 'chest-triceps',
    name: 'Pecho y tríceps',
    description: 'Presses compuestos, flexiones y tríceps: Peck Deck, Smith cerrado, polea y fondos en banco.',
    duration: { Principiante: 50, Intermedio: 65, Avanzado: 75 },
    muscles: ['Pecho', 'Tríceps'],
    featured: true,
    image: '/routines/chest-triceps.svg',
    focus: 'Pecho',
    exercises: [
      slot('barbell-bench-press', compound()),
      slot('incline-dumbbell-press', hyper()),
      slot('peck-deck', isolation()),
      slot('push-up', bodywork({ Principiante: { reps: '8-12 (banco o rodillas)' } })),
      slot('smith-close-grip-press', hyper()),
      slot('cable-pushdown', isolation()),
      slot('bench-dip', bodywork({ Principiante: { reps: '8-10 rodillas a 90°' } })),
      slot('diamond-push-up', skipBeginner(bodywork())),
    ],
  },
  {
    id: 'back-biceps',
    name: 'Espalda y bíceps',
    description: 'Tirones verticales y horizontales, más remo invertido en Smith y curls de barra Z.',
    duration: { Principiante: 55, Intermedio: 70, Avanzado: 80 },
    muscles: ['Espalda', 'Bíceps'],
    featured: true,
    image: '/routines/back-biceps.svg',
    focus: 'Espalda',
    exercises: [
      slot('pull-up', {
        Principiante: { sets: 3, reps: 'Máximas con control', rest: 120 },
        Intermedio: { sets: 4, reps: '6-10', rest: 120 },
        Avanzado: { sets: 4, reps: '6-10 + negativo', rest: 120, technique: 'Negativos lentos al fallo' },
      }),
      slot('lat-pulldown', hyper()),
      slot('t-bar-row', compound()),
      slot('seated-row', hyper()),
      slot('low-cable-row', isolation()),
      slot('inverted-row', bodywork({ Principiante: { reps: '8-10 barra alta' } })),
      slot('ez-bar-curl', hyper()),
      slot('hanging-knee-raise', skipBeginner(bodywork({ Intermedio: { reps: '8-12' } }))),
    ],
  },
  {
    id: 'full-legs',
    name: 'Pierna completa',
    description: 'Sentadilla, prensa, sentadilla perfecta, desplantes inversos y gemelos de peso corporal.',
    duration: { Principiante: 60, Intermedio: 75, Avanzado: 85 },
    muscles: ['Pierna', 'Cuádriceps', 'Femoral', 'Glúteo'],
    featured: true,
    image: '/routines/full-legs.svg',
    focus: 'Pierna',
    exercises: [
      slot('barbell-squat', compound()),
      slot('leg-press', hyper()),
      slot('perfect-squat', hyper()),
      slot('leg-extension', isolation()),
      slot('lying-leg-curl', isolation()),
      slot('reverse-lunge', lunge()),
      slot('calf-raise-bw', bodywork({ Principiante: { reps: '15' }, Intermedio: { reps: '15-20' }, Avanzado: { reps: '20-25' } })),
    ],
  },
  {
    id: 'glutes-hamstrings',
    name: 'Glúteo y femoral',
    description: 'Hip thrust, rumano, puente de glúteo, desplante inverso e hiperextensión.',
    duration: { Principiante: 50, Intermedio: 65, Avanzado: 75 },
    muscles: ['Glúteo', 'Femoral'],
    featured: true,
    image: '/routines/glutes-hamstrings.svg',
    focus: 'Glúteo',
    exercises: [
      slot('hip-thrust', hyper()),
      slot('romanian-deadlift', compound()),
      slot('lying-leg-curl', isolation()),
      slot('smith-glute-squat', hyper()),
      slot('glute-bridge', bodywork({ Principiante: { reps: '12-15' } })),
      slot('reverse-lunge', lunge()),
      slot('glute-hyperextension', isolation()),
      slot('single-leg-glute-bridge', skipBeginner(lunge())),
    ],
  },
  {
    id: 'quads',
    name: 'Cuádriceps',
    description: 'Volumen de rodilla: libre, prensa, sentadilla perfecta, Sissy, extensión, desplante y wall sit.',
    duration: { Principiante: 50, Intermedio: 65, Avanzado: 75 },
    muscles: ['Cuádriceps', 'Pierna'],
    image: '/routines/quads.svg',
    focus: 'Cuádriceps',
    exercises: [
      slot('barbell-squat', compound()),
      slot('leg-press-quad', hyper()),
      slot('perfect-squat', hyper()),
      slot('sissy-squat', {
        Principiante: { sets: 2, reps: '8-10 (rango corto)', rest: 90 },
        Intermedio: { sets: 3, reps: '10-12', rest: 75 },
        Avanzado: { sets: 4, reps: '8-12', rest: 60, technique: 'Pausa de 2s abajo' },
      }),
      slot('leg-extension', isolation()),
      slot('bodyweight-lunge', lunge()),
      slot('wall-sit', hold()),
    ],
  },
  {
    id: 'shoulders-arms',
    name: 'Hombro y brazos',
    description: 'Press de hombro, laterales y posteriores, curls, tríceps y flexiones pike de peso corporal.',
    duration: { Principiante: 50, Intermedio: 65, Avanzado: 75 },
    muscles: ['Hombro', 'Bíceps', 'Tríceps'],
    featured: true,
    image: '/routines/shoulders-arms.svg',
    focus: 'Hombro',
    exercises: [
      slot('dumbbell-shoulder-press', compound()),
      slot('lateral-raise', isolation()),
      slot('rear-delt-cable', isolation()),
      slot('incline-curl', hyper()),
      slot('hammer-curl', isolation()),
      slot('overhead-dumbbell-extension', isolation()),
      slot('pike-push-up', bodywork({ Principiante: { reps: '6-8' } })),
      slot('side-plank', skipBeginner(hold({ Intermedio: { reps: '20-30 s por lado' }, Avanzado: { reps: '30-40 s por lado' } }))),
    ],
  },
  {
    id: 'push',
    name: 'Push',
    description: 'Patrón de empuje: banca, inclinado, hombro, Peck Deck y flexiones de peso corporal.',
    duration: { Principiante: 50, Intermedio: 65, Avanzado: 75 },
    muscles: ['Pecho', 'Hombro', 'Tríceps'],
    featured: true,
    image: '/routines/push.svg',
    focus: 'Push',
    exercises: [
      slot('smith-bench-press', compound()),
      slot('incline-dumbbell-press', hyper()),
      slot('dumbbell-shoulder-press', hyper()),
      slot('peck-deck', isolation()),
      slot('lateral-raise', isolation()),
      slot('cable-pushdown', isolation()),
      slot('push-up', bodywork({ Principiante: { reps: '8-12 (banco o rodillas)' } })),
    ],
  },
  {
    id: 'pull',
    name: 'Pull',
    description: 'Patrón de jalón y remo: dominadas, Remo T, remo invertido, pullover y curls de barra Z.',
    duration: { Principiante: 55, Intermedio: 70, Avanzado: 80 },
    muscles: ['Espalda', 'Bíceps'],
    featured: true,
    image: '/routines/pull.svg',
    focus: 'Pull',
    exercises: [
      slot('pull-up', compound({ Principiante: { reps: 'Máximas asistidas o negativas', rest: 120 } })),
      slot('t-bar-row', compound()),
      slot('lat-pulldown', hyper()),
      slot('seated-row', hyper()),
      slot('seated-pullover', isolation()),
      slot('inverted-row', bodywork({ Principiante: { reps: '8-10 barra alta' } })),
      slot('ez-bar-curl', hyper()),
    ],
  },
  {
    id: 'legs',
    name: 'Legs',
    description: 'Versión PPL de pierna: sentadilla, prensa, hip thrust, desplante caminando y puente de glúteo.',
    duration: { Principiante: 55, Intermedio: 70, Avanzado: 80 },
    muscles: ['Pierna', 'Glúteo', 'Cuádriceps', 'Femoral'],
    image: '/routines/legs.svg',
    focus: 'Legs',
    exercises: [
      slot('barbell-squat', compound()),
      slot('leg-press', hyper()),
      slot('hip-thrust', hyper()),
      slot('lying-leg-curl', isolation()),
      slot('leg-extension', isolation()),
      slot('walking-lunge', lunge({ Principiante: { reps: '8 por pierna' } })),
      slot('glute-bridge', bodywork({ Principiante: { reps: '12-15' } })),
    ],
  },
  {
    id: 'full-body',
    name: 'Full Body',
    description: 'Un compuesto por patrón: sentadilla, desplante, banca, Remo T, hombro, jalón, rumano y flexiones.',
    duration: { Principiante: 50, Intermedio: 65, Avanzado: 75 },
    muscles: ['Full Body', 'Pierna', 'Pecho', 'Espalda', 'Hombro'],
    featured: true,
    image: '/routines/full-body.svg',
    focus: 'Full Body',
    exercises: [
      slot('barbell-squat', compound()),
      slot('reverse-lunge', lunge()),
      slot('barbell-bench-press', compound()),
      slot('t-bar-row', compound()),
      slot('dumbbell-shoulder-press', hyper()),
      slot('lat-pulldown', hyper()),
      slot('romanian-deadlift', hyper()),
      slot('push-up', bodywork({ Principiante: { reps: '8-12 (banco o rodillas)' } })),
    ],
  },
  {
    id: 'strength',
    name: 'Fuerza',
    description: 'Básicos pesados con barra olímpica y Smith: sentadilla, banca, remo, militar y rumano.',
    duration: { Principiante: 55, Intermedio: 70, Avanzado: 80 },
    muscles: ['Full Body', 'Pierna', 'Pecho', 'Espalda', 'Hombro'],
    image: '/routines/strength.svg',
    focus: 'Fuerza',
    exercises: [
      slot('barbell-squat', strength()),
      slot('barbell-bench-press', strength()),
      slot('barbell-row', strength({ Principiante: { sets: 3, reps: '8', rest: 150 } })),
      slot('standing-ohp', strength({ Principiante: { sets: 3, reps: '8', rest: 120 } })),
      slot('romanian-deadlift', strength()),
      slot('pull-up', {
        Principiante: { sets: 3, reps: 'Máximas', rest: 150 },
        Intermedio: { sets: 4, reps: '5-8', rest: 150 },
        Avanzado: { sets: 5, reps: '5-8 lastradas si aplica', rest: 180 },
      }),
    ],
  },
  {
    id: 'beginners',
    name: 'Principiantes',
    description: 'Máquinas guiadas, flexiones inclinadas, desplantes y plancha para aprender patrones sin técnicas avanzadas.',
    duration: { Principiante: 45, Intermedio: 50, Avanzado: 55 },
    muscles: ['Full Body'],
    featured: true,
    image: '/routines/beginners.svg',
    focus: 'Principiantes',
    exercises: [
      slot('treadmill', {
        Principiante: { sets: 1, reps: '6 min suave', rest: 0 },
        Intermedio: { sets: 1, reps: '8 min', rest: 0 },
        Avanzado: { sets: 1, reps: '8 min', rest: 0 },
      }),
      slot('leg-press', {
        Principiante: { sets: 3, reps: '10-12', rest: 90 },
        Intermedio: { sets: 3, reps: '10-12', rest: 75 },
        Avanzado: { sets: 4, reps: '8-12', rest: 75 },
      }),
      slot('reverse-lunge', {
        Principiante: { sets: 3, reps: '8 por pierna', rest: 60 },
        Intermedio: { sets: 3, reps: '10 por pierna', rest: 60 },
        Avanzado: { sets: 3, reps: '12 por pierna', rest: 45 },
      }),
      slot('incline-push-up', {
        Principiante: { sets: 3, reps: '8-12', rest: 60 },
        Intermedio: { sets: 3, reps: '12-15', rest: 45 },
        Avanzado: { sets: 3, reps: '15', rest: 45 },
      }),
      slot('lat-pulldown', {
        Principiante: { sets: 3, reps: '10-12', rest: 90 },
        Intermedio: { sets: 3, reps: '8-12', rest: 75 },
        Avanzado: { sets: 4, reps: '8-12', rest: 75 },
      }),
      slot('seated-row', {
        Principiante: { sets: 3, reps: '10-12', rest: 90 },
        Intermedio: { sets: 3, reps: '8-12', rest: 75 },
        Avanzado: { sets: 3, reps: '8-12', rest: 75 },
      }),
      slot('dumbbell-shoulder-press', {
        Principiante: { sets: 3, reps: '10', rest: 90 },
        Intermedio: { sets: 3, reps: '8-10', rest: 90 },
        Avanzado: { sets: 3, reps: '8-10', rest: 75 },
      }),
      slot('plank', {
        Principiante: { sets: 3, reps: '20-30 s', rest: 45 },
        Intermedio: { sets: 3, reps: '30-40 s', rest: 45 },
        Avanzado: { sets: 3, reps: '45 s', rest: 30 },
      }),
    ],
  },
  {
    id: 'bodyweight-lunges',
    name: 'Desplantes',
    description: 'Peso corporal: sentadilla, desplantes adelante, inverso, caminando y lateral, más step-up y búlgara.',
    duration: { Principiante: 35, Intermedio: 45, Avanzado: 50 },
    muscles: ['Pierna', 'Glúteo', 'Cuádriceps'],
    featured: true,
    image: '/routines/bodyweight-lunges.svg',
    focus: 'Desplantes',
    exercises: [
      slot('bodyweight-squat', {
        Principiante: { sets: 3, reps: '12', rest: 60 },
        Intermedio: { sets: 3, reps: '15', rest: 45 },
        Avanzado: { sets: 4, reps: '15-20', rest: 45 },
      }),
      slot('reverse-lunge', lunge({ Principiante: { reps: '8 por pierna' } })),
      slot('bodyweight-lunge', lunge()),
      slot('walking-lunge', lunge({ Principiante: { reps: '8 por pierna' }, Intermedio: { reps: '10 por pierna' } })),
      slot('lateral-lunge', lunge({ Principiante: { reps: '8 por pierna' } })),
      slot('step-up', lunge()),
      slot('bulgarian-bodyweight', skipBeginner(lunge())),
      slot('jumping-lunge', {
        Principiante: null,
        Intermedio: { sets: 3, reps: '6 por pierna', rest: 75 },
        Avanzado: { sets: 4, reps: '8-10 alternados', rest: 60, technique: 'Aterrizaje suave, sin perder la postura' },
      }),
    ],
  },
  {
    id: 'bodyweight',
    name: 'Peso corporal',
    description: 'Sesión completa sin máquinas pesadas: sentadilla, desplante, flexiones, remo invertido, puente, plancha y fondos.',
    duration: { Principiante: 35, Intermedio: 45, Avanzado: 50 },
    muscles: ['Full Body', 'Pecho', 'Espalda', 'Pierna', 'Core'],
    featured: true,
    image: '/routines/bodyweight.svg',
    focus: 'Peso corporal',
    exercises: [
      slot('bodyweight-squat', bodywork({ Principiante: { reps: '12' }, Intermedio: { reps: '15' }, Avanzado: { reps: '20' } })),
      slot('reverse-lunge', lunge({ Principiante: { reps: '8 por pierna' } })),
      slot('push-up', bodywork({ Principiante: { reps: '8-12 (banco o rodillas)' } })),
      slot('inverted-row', bodywork({ Principiante: { reps: '8-10 barra alta' } })),
      slot('glute-bridge', bodywork({ Principiante: { reps: '12-15' } })),
      slot('dead-bug', bodywork({ Principiante: { reps: '8 por lado' }, Intermedio: { reps: '10 por lado' }, Avanzado: { reps: '12 por lado' } })),
      slot('plank', hold()),
      slot('bench-dip', skipBeginner(bodywork())),
    ],
  },
  {
    id: 'cardio',
    name: 'Cardio',
    description: 'Circuito en caminadora, elíptica, bici y escaladores de peso corporal.',
    duration: { Principiante: 30, Intermedio: 40, Avanzado: 45 },
    muscles: ['Cardio'],
    image: '/routines/cardio.svg',
    focus: 'Cardio',
    exercises: [
      slot('treadmill', cardio('10-12 min')),
      slot('stationary-bike', cardio('10 min')),
      slot('elliptical', cardio('8-10 min')),
      slot('mountain-climbers', {
        Principiante: { sets: 3, reps: '20 s suave', rest: 40 },
        Intermedio: { sets: 3, reps: '30 s', rest: 30 },
        Avanzado: { sets: 4, reps: '40 s', rest: 20 },
      }),
    ],
  },
]

export const routinesById = Object.fromEntries(routines.map((item) => [item.id, item]))

export const muscleCategories = [
  'Pecho',
  'Espalda',
  'Pierna',
  'Glúteo',
  'Femoral',
  'Cuádriceps',
  'Hombro',
  'Bíceps',
  'Tríceps',
  'Core',
  'Full Body',
  'Cardio',
] as const
