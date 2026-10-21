export type TermGroup = 'base' | 'tecnica'

export interface Term {
  id: string
  name: string
  group: TermGroup
  meaning: string
  how: string
  aliases: string[]
}

export const trainingTerms: Term[] = [
  {
    id: 'serie',
    name: 'Serie',
    group: 'base',
    meaning: 'Un bloque de repeticiones seguidas, sin soltar el peso.',
    how: 'Si dice 4 series de 10, haces 10 repeticiones, descansas, y repites eso 4 veces.',
    aliases: ['series', 'set', 'sets'],
  },
  {
    id: 'repeticion',
    name: 'Repetición',
    group: 'base',
    meaning: 'Una vez completa del movimiento: bajar y subir, o el ciclo entero.',
    how: '“8-12 reps” significa que en esa serie debes hacer entre 8 y 12 repeticiones con buena forma.',
    aliases: ['reps', 'repeticiones', 'rep'],
  },
  {
    id: 'descanso',
    name: 'Descanso',
    group: 'base',
    meaning: 'El tiempo que paras entre una serie y la siguiente.',
    how: 'No es tiempo muerto: respira, suelta el peso y espera el reloj. Luego sigue con la misma carga.',
    aliases: ['rest', 'pausa entre series'],
  },
  {
    id: 'fallo',
    name: 'Fallo',
    group: 'base',
    meaning: 'El punto en el que ya no puedes hacer otra repetición con buena técnica.',
    how: 'Para. No sigas si la espalda se redondea, el hombro se encoge o usas impulso. El fallo es de músculo, no de forma.',
    aliases: ['al fallo', 'failure'],
  },
  {
    id: 'dropset',
    name: 'Dropset',
    group: 'tecnica',
    meaning: 'Al terminar la serie, bajas el peso de inmediato y sigues unas repeticiones más, sin sentarte a descansar.',
    how: 'Terminas las reps. Quita disco o baja el pin. Saca 6-10 más. Eso cuenta como la misma serie, no como una nueva.',
    aliases: ['drop set', 'drop-set', 'series descendentes'],
  },
  {
    id: 'rest-pause',
    name: 'Rest-pause',
    group: 'tecnica',
    meaning: 'Llegas cerca del fallo, sueltas 10 a 15 segundos y haces unas repeticiones extra con el mismo peso.',
    how: 'No es un descanso de serie. Es una mini pausa para robar 4-6 reps más. Luego sí descansas el tiempo normal.',
    aliases: ['rest pause', 'restpause'],
  },
  {
    id: 'superserie',
    name: 'Superserie',
    group: 'tecnica',
    meaning: 'Dos ejercicios seguidos, uno detrás del otro, sin descanso en medio.',
    how: 'Haces el A, pasas al B de inmediato, y recién ahí descansas. Sirve para ahorrar tiempo o fatigar más el músculo.',
    aliases: ['superseries', 'super serie', 'superset'],
  },
  {
    id: 'negativo',
    name: 'Negativo',
    group: 'tecnica',
    meaning: 'La parte en la que bajas el peso (o el cuerpo), hecha más lenta y con control.',
    how: 'Cuenta 2 a 4 segundos en la bajada. No te dejes caer. El músculo frena el peso, no la gravedad.',
    aliases: ['negativos', 'excéntrico', 'excentrico'],
  },
  {
    id: 'pausa',
    name: 'Pausa',
    group: 'tecnica',
    meaning: 'Te quedas 1 a 3 segundos quieto en un punto del movimiento, con el músculo en tensión.',
    how: 'Si dice “pausa abajo”, no rebotes: quédate en el fondo, luego sube. Quita el impulso y obliga al músculo a trabajar.',
    aliases: ['pausa de', 'tempo'],
  },
  {
    id: 'isometrico',
    name: 'Isométrico',
    group: 'tecnica',
    meaning: 'Sostienes una posición sin moverte. El músculo trabaja aunque no haya reps.',
    how: 'Plancha o wall sit: el reloj es la repetición. Si la postura se rompe, termina la serie.',
    aliases: ['isométrico', 'hold', 'isometrico'],
  },
  {
    id: 'maximas',
    name: 'Máximas',
    group: 'base',
    meaning: 'Tantas repeticiones como puedas en esa serie, siempre con forma limpia.',
    how: 'No es un número fijo. Paras cuando la técnica se cae, no cuando “ya arde”.',
    aliases: ['máximas', 'maximas', 'amrap'],
  },
  {
    id: 'aterrizaje',
    name: 'Aterrizaje suave',
    group: 'tecnica',
    meaning: 'Bajas el salto con el pie completo y las rodillas alineadas, sin golpear el piso.',
    how: 'Si suena fuerte, baja menos. El control al caer es parte del ejercicio, no el adorno del salto.',
    aliases: ['aterrizaje'],
  },
]

export const termsById = Object.fromEntries(trainingTerms.map((term) => [term.id, term])) as Record<string, Term>
