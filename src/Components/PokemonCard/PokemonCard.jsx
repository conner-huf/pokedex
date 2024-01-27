import React from 'react'
import './PokemonCard.css'

export const PokemonCard = ({ data }) => {
    return (
        <div className="pokemon-display">
            <img className="searched-pokemon-sprite" src={data.sprites.front_default} alt={data.name} />
        </div>
    )
}