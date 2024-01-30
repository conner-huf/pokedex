import React, { useEffect, useState } from 'react'
import axios from "axios";
import { PokemonCard } from '../PokemonCard/PokemonCard'

import './Main.css'

export const Main = ({ search, url, setUrl, page, setPage, setSelectedPokemon }) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const debounce = (func, delay) => {
    let debounceTimer;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    }
  }

  const getPokemon=async(data)=>{

    const promises = data.map(item => axios.get(item.url));
    const pokemon = await Promise.all(promises);

    setPokemonData(state=>{
      const newState=[...pokemon.map(p=>p.data)];
      newState.sort((a,b) => a.id > b.id ? 1 : -1);
      return newState;
    });
    setIsLoading(false);
  }

  const handlePageChange = (e) => {
    const pageNumber = Number(e.target.value);
    if (pageNumber) {
      setPage(pageNumber);
    }
  };

  const debouncedHandlePageChange = debounce((pageNumber) => {
    if (pageNumber) {
      setUrl(`https://pokeapi.co/api/v2/pokemon?offset=${(pageNumber-1)*20}&limit=20`);
    }
  }, 500);

  const pokeFetch=async()=>{
    setIsLoading(true);
    setPokemonData([]);
    const res=await axios.get(url);
    getPokemon(res.data.results).then(() => setIsLoading(false));
  }

  useEffect(() => {
    pokeFetch();
  }, [url]);

  useEffect(() => {
    debouncedHandlePageChange(page);
  }, [page]);

  return (
    <div className="pokemon-container">
      <div className='page-btn-container'>
        <button className="page-btn prev-btn" onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}>Previous</button>
        <input className="page-num-field" type="number" value={page} onChange={handlePageChange} min="1" />
        <button className="page-btn next-btn" onClick={() => setPage(prevPage => prevPage + 1)}>Next</button>
      </div>
      <div className="pokemon-list">
        {pokemonData.map((pokemonData, index) => (
          <PokemonCard key={index} data={pokemonData} setSelectedPokemon={setSelectedPokemon} />
        ))}
      </div>
    </div>
  )
}
