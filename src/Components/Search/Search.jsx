import React, { useState, useEffect } from 'react'
import './Search.css'

export const Search = ({ setPokemonData }) => {
    const [search, setSearch] = useState("")

    useEffect(() => {
        if (search) {
            setSearch(search.toLowerCase());
            fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
                .then(response => response.json())
                .then(data => setPokemonData(data));
        }
    }, [search, setPokemonData]);

    return (
        <div>
            <input className="search-bar" type="text" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
    )
}