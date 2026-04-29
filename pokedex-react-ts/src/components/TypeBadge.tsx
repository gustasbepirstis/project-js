import type { PokemonType } from '../data/pokemon'

const TYPE_COLORS: Record<PokemonType, string> = {
  grass: '#7ac74c',
  poison: '#a33ea1',
  fire: '#ee8130',
  water: '#6390f0',
  electric: '#f7d02c',
  normal: '#a8a77a',
  fairy: '#d685ad',
  ghost: '#735797',
  flying: '#a98ff3',
  psychic: '#f95587',
}

type Props = {
  type: PokemonType
}

function TypeBadge({ type }: Props) {
  return (
    <span className="type-badge" style={{ background: TYPE_COLORS[type] }}>
      {type}
    </span>
  )
}

export default TypeBadge
