import React, { useEffect, useState } from 'react'
import './Footer.css'

export const Footer = ({ selectedPokemon }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 800);

    useEffect(() => {
      const checkScreenSize = () => setIsSmallScreen(window.innerWidth < 800);
      window.addEventListener('resize', checkScreenSize);
      return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const scrollToTop = () => {
        document.querySelector('.main-content').scrollTo(0, 0);
      }

      return (
        <button className={`footer-button ${selectedPokemon && isSmallScreen ? 'hidden-footer' : ''}`} onClick={scrollToTop}>^</button>
      )
}
