import React from 'react'
import './Main.css'

import { PokemonCard } from '../PokemonCard/PokemonCard'

export const Main = ({ pokemonData }) => {
  return (
    <div className="main-section">
        {pokemonData.map((data, index) => (
          <PokemonCard key={index} data={data} />
        ))}
    </div>
  )
}
