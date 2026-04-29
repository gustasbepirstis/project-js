import type { Pokemon } from '../data/pokemon'
import TypeBadge from './TypeBadge'

type Props = {
    pokemon: Pokemon,
    onHover: (pokemon: Pokemon) => void,
}

function PokemonCard({ pokemon, onHover }: Props) {
    return (
        <li className="pokemon-card" onMouseEnter={() => onHover(pokemon)}>
            <span className="pokemon-id">#{String(pokemon.id).padStart(3, '0')}</span>
            <span className="pokemon-name">{pokemon.name}</span>
            <span className="pokemon-types">
            {pokemon.type.map((type) => (
                <TypeBadge key={type} type={type} />
            ))}
            </span>
        </li>
    )
}

export default PokemonCard
