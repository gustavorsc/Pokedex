import './App.css';
import React, { useState } from 'react';
import './style.css';

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [input, setInput] = useState('');

  function loadAPI() {
    let url = `https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Pokemon not found');
        }
        return response.json();
      })
      .then(json => {
        setPokemon(json);
      })
      .catch(err => {
        console.log(err);
        setPokemon(null);
      });
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      loadAPI();
    }
  }

  return (
    <div className='container'>
      <header>
        <strong>Pokemon API</strong>
      </header>
      <div>
        <input
          type='text'
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder='Digite o nome do Pokémon'
        />
        <button onClick={loadAPI}>Buscar</button>
      </div>
      {pokemon ? (
        <div className='pokemon'>
          <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
          <div>Nome: {pokemon.name}</div>
          <div>Nº: {pokemon.id}</div>
          <div>Peso: {pokemon.weight / 10} kg</div>
          <div>Altura: {pokemon.height / 10} m</div>
        </div>
      ) : (
        <p>Pokemon não encontrado</p>
      )}
    </div>
  );
}

export default App;
