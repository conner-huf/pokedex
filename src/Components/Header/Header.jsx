import React from 'react'
import './Header.css'
import { Search } from '../Search/Search'

export const Header = ({ setPokemonData }) => {
  return (
    <div className='header-container'>
      <h1>Pokedex</h1>
      <Search setPokemonData={setPokemonData} />
    </div>
  )
}
