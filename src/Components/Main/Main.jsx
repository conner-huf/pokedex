import React, { useEffect, useState } from 'react'
import axios from "axios";
import { PokemonCard } from '../PokemonCard/PokemonCard'
import loadingGif from '../../Assets/PokeballShake.gif'

import './Main.css'

export const Main = ({ search, url, setUrl, page, setPage, setSelectedPokemon, matches }) => {
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
      setUrl(`https://pokeapi.co/api/v2/pokemon?offset=${(pageNumber-1)*100}&limit=100`);
    }
  }, 500);

  const pokeFetch=async()=>{
    setIsLoading(true);
    setPokemonData([]);
    const res=await axios.get(url);
    getPokemon(res.data.results).then(() => setIsLoading(false));
  }

  useEffect(() => {
    if (search !== '') {
      Promise.all(matches.map(match => axios.get(match.url)))
        .then(response => setPokemonData(response.map(res => res.data)));
    } else {
    pokeFetch();
    }
  }, [url, search, matches]);

  useEffect(() => {
    debouncedHandlePageChange(page);
  }, [page]);

  const filteredPokemonData = pokemonData.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="pokemon-container">
      {isLoading ? (
        <>
          <img className="loading-image" src={loadingGif} alt="Loading..." />
          <h3 className='loading-text'>Loading...</h3>
        </>
      ) : (
      <>
        <div className='page-btn-container'>
          <button className="page-btn prev-btn" onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}>Previous</button>
          <input className="page-num-field" type="number" value={page} onChange={handlePageChange} min="1" max="14" />
          <button className="page-btn next-btn" onClick={() => setPage(prevPage => prevPage + 1)}>Next</button>
        </div>
        <div className="pokemon-list">
          {filteredPokemonData.map((pokemonData, index) => (
            <PokemonCard key={index} data={pokemonData} setSelectedPokemon={setSelectedPokemon} />
            ))}
        </div>
      </>
      )}
    </div>
  )
}
