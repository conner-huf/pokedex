import './App.css';
import React, { useState } from 'react'
import { Header } from './Components/Header/Header';
import { Main } from './Components/Main/Main';
import { Sidebar } from './Components/Sidebar/Sidebar';

function App() {
  const [pokemonData, setPokemonData] = useState([])
  const [page, setPage] = useState(1)

  return (
    <>
      <div>
        <Header setPokemonData={setPokemonData} setPage={setPage} page={page} />
      </div>
      <div className="mid-screen">
        <div className="main-content">
          <Main pokemonData={pokemonData} page={page} setPage={setPage} />
        </div>
        <div className='side-content'>
          <Sidebar />
        </div>
      </div>
      
    </>
  );
}

export default App;
