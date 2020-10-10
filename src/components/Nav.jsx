import React , { useState, useEffect }from 'react';
import { getPokemons } from '../util/pokemonAPI';

const Nav = () => {
    const [search, setSearch] = useState("");
    const [match, setMatch] = useState([]);

    useEffect(() => {
        async function loadPokemons() {
            try {
                const res = await getPokemons(`https://pokeapi.co/api/v2/pokemon?limit=1050`);
                const pokemonList = res.results.filter(pokemon => pokemon.name.includes(search.toLocaleLowerCase()));
                setMatch(pokemonList)
                
            } catch(err) {
                console.log(err);
            }
        }

        if(search.length !== 0){
            loadPokemons()
        } else {
            setMatch([]);
        }
        
    },[search]);

    const handleOnchange = (e) => {
        setSearch(e.target.value);
    }
    return (
        <>
            <input type="text" onChange={handleOnchange} value={search}/>
            {match.length > 0 && match.map(pokemon => (<h1>{pokemon.name}</h1>))}
        </>
    )
}

export default Nav;