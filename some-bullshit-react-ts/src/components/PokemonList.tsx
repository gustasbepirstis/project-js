import PokemonCard from "./PokemonCard";
import type { Pokemon } from "../data/pokemon";

type Props = {
    pokemon: Pokemon[],
    onHover: (pokemon: Pokemon) => void,
}

function PokemonList({ pokemon, onHover }: Props) {
    return(
        <ul className="pokemon-list">
        {
            pokemon.map((p) => (
                <PokemonCard key={p.id} pokemon={p} onHover={onHover} />
            ))
        }
        </ul>
    )
}

export default PokemonList
