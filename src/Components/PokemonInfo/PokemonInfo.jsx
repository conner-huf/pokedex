import React, { useEffect, useState } from 'react'
import './PokemonInfo.css'
import axios from 'axios';

export const PokemonInfo = ({ selectedPokemon, setSelectedPokemon }) => {
    const [abilityDescriptions, setAbilityDescriptions] = useState([]);
    const [selectedTab, setSelectedTab] = useState('abilities');

    const panelClass = selectedPokemon ? 'pokemon-info-panel' : 'pokemon-info-panel hidden';

    const getTypeColor = (type) => {
        switch (type) {
            case 'fire':
                return '#f44242';
            case 'electric':
                return '#f4e841';
            case 'grass':
                return '#42f44e';
            case 'flying':
                return '#c1ffff';
            case 'water':
                return '#0e6fda';
            case 'poison':
                return '#8e2f8e';
            case 'bug':
                return '#8e8e2f';
            case 'ground':
                return '#8e5e2f';
            case 'rock':
                return '#8e5e5e';
            case 'fighting':
                return '#a52a2a';
            case 'psychic':
                return '#bd0ebb';
            case 'ice':
                return '#9ed8d8';
            case 'ghost':
                return '#5f4f7a';
            case 'dragon':
                return '#5f4f7a';
            case 'dark':
                return '#5f4f7a';
            case 'steel':
                return '#5f4f7a';
            case 'fairy':
                return '#f6abd7';
            case 'normal':
                return '#a2a596';
            default:
                return 'gray'; // Default color
        }
    };

    const typeColors = selectedPokemon
    ? selectedPokemon.types.map(type => getTypeColor(type.type.name))
    : [];

    const gradient = typeColors.length > 1
    ? `linear-gradient(to right, ${typeColors[0]}, ${typeColors[1]})`
    : typeColors[0] || 'transparent';

    useEffect(() => {
        if (selectedPokemon) {
            const fetchAbilityDescriptions = async () => {
                const descriptions = await Promise.all(
                    selectedPokemon.abilities.map(async (ability) => {
                        const response = await axios.get(ability.ability.url);
                        const englishDescription = response.data.effect_entries.find(entry => entry.language.name === 'en');
                        return englishDescription ? englishDescription.effect : '';
                    })
                );
                setAbilityDescriptions(descriptions);
            };
            fetchAbilityDescriptions();
        }
    }, [selectedPokemon]);

    return (
        <div className={panelClass}>
            {selectedPokemon && (
                <div className="panel">
                    <button className='deselect-button' onClick={() => setSelectedPokemon(null)}>X</button>
                    <img className="selected-pokemon-img" src={selectedPokemon.sprites.other['official-artwork'].front_default} alt={selectedPokemon.name} />
                    <h2 className='selected-pokemon-name'>{selectedPokemon.name}</h2>
                    <h4 className='selected-pokemon-types' style={{background: gradient}}>
                        {selectedPokemon.types.map(type => type.type.name).join(' / ')}
                        </h4>
                    <h5 className='selected-pokemon-measurements'>Height: {selectedPokemon.height / 10} m</h5>
                    <h5 className='selected-pokemon-measurements'>Weight: {selectedPokemon.weight / 10} kg</h5>
                    <table className='selected-pokemon-stats'>
                        <tbody>
                            {selectedPokemon.stats.map((stat, index) => (
                                <tr key={index}>
                                    <td className='pokemon-stat-name'>{stat.stat.name}</td>
                                    <td className='pokemon-stat-value' style={{backgroundColor: stat.base_stat > 70 ? 'rgb(76, 219, 76)' : 'rgb(221, 69, 69)'}}>
                                        {stat.base_stat}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='tabbed-info-section-container'>
                        <div className='tabs'>
                            <button className={`pokemon-info-tab-buttons ${selectedTab === 'abilities' ? 'selected-tab' : ''}`} onClick={() => setSelectedTab('abilities')}>Abilities</button>
                            <button className={`pokemon-info-tab-buttons ${selectedTab === 'moves' ? 'selected-tab' : ''}`} onClick={() => setSelectedTab('moves')}>Moves</button>
                        </div>
                        {selectedTab === 'abilities' && (
                        <div className='selected-pokemon-abilities'>
                            <ul className='selected-pokemon-ability-list'>
                                {selectedPokemon.abilities.map((ability, index) => (
                                    <li key={index}>
                                        <span className="ability-name">{ability.ability.name}</span>
                                        <hr />
                                        {abilityDescriptions[index] && <p className='ability-description'>{abilityDescriptions[index]}</p>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        )}
                        {selectedTab === 'moves' && (
                            <div className='selected-pokemon-moves'>
                                <table className="move-table-container">
                                    <thead>
                                        <tr>
                                            <th className='move-table-move-label'>Move</th>
                                            <th className='move-table-level-label'>Level</th>
                                        </tr>
                                    </thead>
                                    <tbody className='table-body-entries'>
                                        {selectedPokemon.moves
                                            .map(move => {
                                                const learnedAt = move.version_group_details.find(detail => detail.version_group.name === 'sun-moon')?.level_learned_at;
                                                return { ...move, learnedAt };
                                            })
                                            .filter(move => move.learnedAt)
                                            .sort((a, b) => a.learnedAt - b.learnedAt)
                                            .map((move, index) => (
                                                <tr key={index}>
                                                    <td className='move-table-move-name'>{move.move.name}</td>
                                                    <td className='move-table-move-level'>{move.learnedAt}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}