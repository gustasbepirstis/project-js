export type PokemonType =
  | 'grass'
  | 'poison'
  | 'fire'
  | 'water'
  | 'electric'
  | 'normal'
  | 'fairy'
  | 'ghost'
  | 'flying'
  | 'psychic'

export type Pokemon = {
    id: number,
    name: string,
    type: PokemonType[]
}

export const pokemon: Pokemon[] = [
    { id: 1, name: "bulbasaur", type: ["grass"] },
    { id: 4, name: "charmander", type: ["fire"] },
    { id: 7, name: 'squirtle', type: ['water'] },
    { id: 16, name: "pidgey", type: ['normal', 'flying']},
    { id: 19, name: "rattata", type: ['normal']},
    { id: 24, name: "ekans", type: ['poison']},
    { id: 37, name: "vulpix", type: ['fire']},
    { id: 39, name: 'jigglypuff', type: ['normal', 'fairy'] },
    { id: 45, name: 'vileplume', type: ['grass', 'poison']},
    { id: 63, name: 'abra', type: ['psychic'] },
    { id: 100, name: "bulbasaur", type: ["grass"] },
    { id: 400, name: "charmander", type: ["fire"] },
    { id: 700, name: 'squirtle', type: ['water'] },
    { id: 1600, name: "pidgey", type: ['normal', 'flying']},
    { id: 1900, name: "rattata", type: ['normal']},
    { id: 2400, name: "ekans", type: ['poison']},
    { id: 3700, name: "vulpix", type: ['fire']},
    { id: 3900, name: 'jigglypuff', type: ['normal', 'fairy'] },
    { id: 4500, name: 'vileplume', type: ['grass', 'poison']},
    { id: 6300, name: 'abra', type: ['psychic'] },
]