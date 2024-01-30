import React from 'react'
import './Sidebar.css'

export const Sidebar = ({ setUrl }) => {
  const handleNormalTypeClick = () => {
    setUrl(`https://pokeapi.co/api/v2/type/1/pokemon?offset=0&limit=20`);
  }

  return (
    <div className='sidebar'>
      <button onClick={handleNormalTypeClick}>Show Normal Type Pokemon</button>
    </div>
  )
}
