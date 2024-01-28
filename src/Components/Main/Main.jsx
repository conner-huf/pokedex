import React, { useEffect, useState } from 'react'
import { PokemonCard } from '../PokemonCard/PokemonCard'
import './Main.css' 

export const Main = ({ page, setPage }) => {
    const [pokemonData, setPokemonData] = useState([]);

    useEffect(() => {
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const promises = data.results.map(pokemon => fetch(pokemon.url).then(response => response.json()));
                Promise.all(promises).then(fullData => setPokemonData(fullData));
            });
    }, [page]);

    const handlePageChange = (e) => {
      const pageNumber = Number(e.target.value);
      if (pageNumber) {
          setPage(pageNumber);
      }
    }

    return (
        <div className="pokemon-container">
          <div className='page-btn-container'>
            <button className="page-btn prev-btn" onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}>Previous</button>
            <input className="page-num-field" type="number" value={page} onChange={handlePageChange} min="1" />
            <button className="page-btn next-btn" onClick={() => setPage(prevPage => prevPage + 1)}>Next</button>
          </div>
          <div className="pokemon-list">
            {pokemonData.map((data, index) => (
              <PokemonCard key={index} data={data} />
            ))}
          </div>
        </div>
    )
}
