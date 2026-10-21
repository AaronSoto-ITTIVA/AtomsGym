import { trainingTerms, type Term } from '../data/terms'

const skipInTechniqueLabel = new Set(['serie', 'repeticion', 'descanso'])

export function termsForTechnique(technique?: string): Term[] {
  if (!technique) return []
  const text = technique.toLocaleLowerCase('es')
  const matched: Term[] = []

  for (const term of trainingTerms) {
    if (skipInTechniqueLabel.has(term.id)) continue
    const keys = [term.id, term.name, ...term.aliases].map((key) => key.toLocaleLowerCase('es'))
    if (keys.some((key) => text.includes(key))) matched.push(term)
  }

  const pause = trainingTerms.find((term) => term.id === 'pausa')
  const restPause = trainingTerms.find((term) => term.id === 'rest-pause')
  if (text.includes('rest-pause') || text.includes('rest pause')) {
    return matched.filter((term) => term.id !== 'pausa' && term.id !== 'descanso')
  }
  if (pause && restPause && matched.includes(pause) && matched.includes(restPause)) {
    return matched.filter((term) => term.id !== 'pausa')
  }

  return matched
}

export function uniqueTerms(techniques: string[]): Term[] {
  const seen = new Set<string>()
  const list: Term[] = []
  for (const technique of techniques) {
    for (const term of termsForTechnique(technique)) {
      if (seen.has(term.id)) continue
      seen.add(term.id)
      list.push(term)
    }
  }
  return list
}
