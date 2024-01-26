import React from 'react'
import './Main.css'

import { PokemonInfo } from '../PokemonInfo/PokemonInfo'

export const Main = ({ pokemonData }) => {
  return (
    <div className="main-section">
        <PokemonInfo data={pokemonData}/>
    </div>
  )
}
