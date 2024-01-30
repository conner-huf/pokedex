import React from 'react'
import './Header.css'
import { Search } from '../Search/Search'
import pokedexLogo from '../../Assets/PokedexLogo.png'

export const Header = ({ search, setSearch }) => {

  return (
    <div className='header-container'>
      <img src={pokedexLogo} alt='Pokemon Logo' className='pokedex-logo' />
      <Search search={search} setSearch={setSearch} />
    </div>
  )
}
