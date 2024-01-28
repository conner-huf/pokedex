import React, { useState, useEffect } from 'react'
import './Search.css'

export const Search = ({ setPokemonData }) => {
    const [search, setSearch] = useState("")

    useEffect(() => {
        if (search) {
            const url = `https://pokeapi.co/api/v2/pokemon/${search}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    setPokemonData([data]);
                })
                .catch(error => console.log(error));
        }
    }, [search, setPokemonData]);

    return (
        <div className='search-bar-and-buttons'>
            <input className="search-bar" type="text" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
    )
}