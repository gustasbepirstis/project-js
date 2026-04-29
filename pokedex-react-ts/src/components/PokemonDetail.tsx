import type { Pokemon } from '../data/pokemon'

type Props = {
  pokemon: Pokemon | null
}

function PokemonDetail({ pokemon }: Props) {
  if (!pokemon) {
    return <div className="pokemon-detail">Hover a Pokémon</div>
  }

  return (
    <div className="pokemon-detail">
      <div className="pokemon-detail-image">no image</div>
      <h2>{pokemon.name}</h2>
      <p>#{String(pokemon.id).padStart(3, '0')}</p>
    </div>
  )
}

export default PokemonDetail
