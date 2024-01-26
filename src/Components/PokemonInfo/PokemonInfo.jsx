import React from 'react'
import './PokemonInfo.css'

export const PokemonInfo = ({ data }) => {
  if (!data) {
    return (
      <div className="search-for-poke-text">
        Search for a Pokemon!
      </div>
    )
  }

  const types = data.types.map(type => type.type.name).join(' / ');

  return (
    <div className="pokemon-display">
        <img className="searched-pokemon-sprite" src={data.sprites.front_default} alt={data.name} />
        <div className="searched-pokemon-basic-info">
          <h2 className="searched-pokemon-name">{data.name}</h2>
          <div className="searched-pokemon-types">
            <h4>{types}</h4>
          </div>
        </div>
        <div className="searched-pokemon-stats">
        {data.stats.map((stat, index) => (
            <p key={index}>{stat.stat.name}: {stat.base_stat}</p>
          ))}
        </div>
    </div>
  )
}