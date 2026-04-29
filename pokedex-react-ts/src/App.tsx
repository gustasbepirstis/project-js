import { pokemon } from "./data/pokemon";
import type { Pokemon } from "./data/pokemon";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import { useState } from "react";
import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [hovered, setHovered] = useState<Pokemon | null>(null)

  return (
    <>
      <Header />
      <center>
        <SearchBar value={query} onChange={setQuery} />
      </center>

      <div className="layout">
        <div className={"list-pane"}>
          <h1 style={{paddingLeft: 12}}>List</h1>
          <PokemonList
            pokemon={pokemon.filter((p) => p.name.includes(query))}
            onHover={setHovered}
          />
        </div>
        <div className="detail-pane">
          <PokemonDetail pokemon={hovered} />
        </div>
      </div>
    </>
  )
}

export default App
