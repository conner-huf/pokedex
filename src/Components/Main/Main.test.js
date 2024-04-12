import React from 'react';
import { render } from '@testing-library/react';
import { Main } from './Main';

describe('Main', () => {
  it('renders without crashing', () => {
    const mockSetUrl = jest.fn();
    const mockSetPage = jest.fn();
    const mockSetSelectedPokemon = jest.fn();
    const { container } = render(
      <Main 
        search="" 
        url="https://pokeapi.co/api/v2/pokemon?offset=0&limit=100" 
        setUrl={mockSetUrl} 
        page={1} 
        setPage={mockSetPage} 
        setSelectedPokemon={mockSetSelectedPokemon} 
        matches={[]}
      />
    );
    expect(container).toBeTruthy();
  });
});