import React, { useState, useEffect } from 'react'
import './Search.css'

export const Search = ({ setPokemonData, setPage, page }) => {
    const [search, setSearch] = useState("")

    useEffect(() => {
        const url = search ? `https://pokeapi.co/api/v2/pokemon/${search}` : `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const pokemonData = search ? [data] : data.results;
                if (!search) {
                    // Fetch full data for each Pokemon
                    const promises = pokemonData.map(pokemon => fetch(pokemon.url).then(response => response.json()));
                    Promise.all(promises).then(fullData => setPokemonData(fullData));
                } else {
                    setPokemonData(pokemonData);
                }
            });
    }, [search, setPokemonData, page]);

    return (
        <div>
            <input className="search-bar" type="text" value={search} onChange={e => setSearch(e.target.value)} />
            <button onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}>Previous</button> {/* Add this line */}
            <button onClick={() => setPage(prevPage => prevPage + 1)}>Next</button> {/* Add this line */}
        </div>
    )
}