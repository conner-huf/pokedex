import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PokemonCard } from './PokemonCard';

describe('PokemonCard', () => {
  it('renders without crashing', () => {
    const data = {
      id: 1,
      name: 'Bulbasaur',
      sprites: { front_default: 'bulbasaur.png' },
    };
    const { getByText, getByAltText } = render(<PokemonCard data={data} setSelectedPokemon={() => {}} />);
    expect(getByText('1')).toBeInTheDocument();
    expect(getByAltText('Bulbasaur')).toBeInTheDocument();
    expect(getByText('Bulbasaur')).toBeInTheDocument();
  });

  it('calls setSelectedPokemon with data on click', () => {
    const data = {
      id: 1,
      name: 'Bulbasaur',
      sprites: { front_default: 'bulbasaur.png' },
    };
    const setSelectedPokemon = jest.fn();
    const { getByText } = render(<PokemonCard data={data} setSelectedPokemon={setSelectedPokemon} />);

    fireEvent.click(getByText('Bulbasaur'));
    expect(setSelectedPokemon).toHaveBeenCalledWith(data);
  });
});