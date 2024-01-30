import React from 'react'
import './Search.css'

export const Search = ({ search, setSearch }) => {

    return (
        <div className='search-bar-and-buttons'>
            <input className="search-bar" type="text" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
    )
}