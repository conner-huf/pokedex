import React, { useState, useEffect } from 'react'
import { Header } from './Components/Header/Header';
import { Main } from './Components/Main/Main';
import { PokemonInfo } from './Components/PokemonInfo/PokemonInfo';
import { Footer } from './Components/Footer/Footer';
import axios from 'axios';

import './App.css';

function App() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`);
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [allPokemon, setAllPokemon] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=10000')
      .then(response => setAllPokemon(response.data.results));
  }, []);

  useEffect(() => {
    if (search !== '') {
      const matches = allPokemon.filter(pokemon => pokemon.name.includes(search));
      setMatches(matches);
    }
  }, [search, allPokemon]);

  return (
    <>
      <div>
        <Header search={search} setSearch={setSearch} />
      </div>
      <div className="mid-screen">
        <div className='left-side-content'>
        </div>
        <div className="main-content">
          <Main setSelectedPokemon={setSelectedPokemon} url={url} setUrl={setUrl} search={search} page={page} setPage={setPage} matches={matches} />
        </div>
        <div className='right-side-content'>
          <PokemonInfo selectedPokemon={selectedPokemon} setSelectedPokemon={setSelectedPokemon} />
        </div>
        <Footer selectedPokemon={selectedPokemon} />
      </div>
    </>
  );
}

export default App;
