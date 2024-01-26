import './App.css';
import React, { useState } from 'react'
import { Header } from './Components/Header/Header';
import { Main } from './Components/Main/Main';

function App() {
  const [pokemonData, setPokemonData] = useState(null)

  return (
    <>
      <div>
        <Header setPokemonData={setPokemonData} />
      </div>
      <div className="main-content">
        <Main pokemonData={pokemonData} />
      </div>
    </>

  );
}

export default App;
