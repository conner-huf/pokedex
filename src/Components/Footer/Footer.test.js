import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<Footer />);
    expect(getByText('^')).toBeInTheDocument();
  });

  it('scrolls to top on click', () => {
    const { getByText } = render(<Footer />);
    const scrollToMock = jest.fn();
    document.querySelector = jest.fn().mockReturnValue({ scrollTo: scrollToMock });

    fireEvent.click(getByText('^'));
    expect(scrollToMock).toHaveBeenCalledWith(0, 0);
  });

  it('adds hidden-footer class when selectedPokemon is true and isSmallScreen is true', () => {
    const { container } = render(<Footer selectedPokemon={true} />);
    window.innerWidth = 500;
    fireEvent(window, new Event('resize'));
    expect(container.querySelector('.footer-button').classList.contains('hidden-footer')).toBe(true);
  });
});