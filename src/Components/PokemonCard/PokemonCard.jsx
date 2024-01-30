import React from 'react'
import './PokemonCard.css'

export const PokemonCard = ({ data, setSelectedPokemon }) => {
    return (
        <div className="pokemon-display" onClick={() => setSelectedPokemon(data)}>
            <h2 className='displayed-pokemon-id'>{data.id}</h2>
            <img className="displayed-pokemon-sprite" src={data.sprites.front_default} alt={data.name} />
            <h2 className='displayed-pokemon-name'>{data.name}</h2>
        </div>
    )
}