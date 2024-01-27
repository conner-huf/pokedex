import './App.css';
import React, { useState } from 'react'
import { Header } from './Components/Header/Header';
import { Main } from './Components/Main/Main';

function App() {
  const [pokemonData, setPokemonData] = useState([])
  const [page, setPage] = useState(1)

  return (
    <>
      <div>
        <Header setPokemonData={setPokemonData} setPage={setPage} page={page} />
      </div>
      <div className="main-content">
        <Main pokemonData={pokemonData} />
      </div>
    </>
  );
}

export default App;
