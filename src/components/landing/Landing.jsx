import React ,{ useEffect, useState }from 'react';
import { getPokemons, getOnePokemon } from '../../util/pokemonAPI';


const Landing = () => {
    const [previousPage, setPreviousPage] = useState(null);
    const [currentPage, setCurrentPage] = useState('https://pokeapi.co/api/v2/pokemon');
    const [nextPage, setNextPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        let mounted = true
          setLoading(true);
          async function loadPokemons(){
            try {
              const res = await getPokemons(currentPage)
              setPreviousPage(res.previous);
              setNextPage(res.next);
              
              if(mounted){
                const pokemonList = await Promise.all(res.results.map(i => getOnePokemon(i.url)));
                console.log('!!!:',pokemonList)
                setPokemons(pokemonList);
                setLoading(false)
              }
            }catch(err) {
              console.log(err)
            }
          }
        loadPokemons()
          
        return () => {
        mounted = false;
        }
    }, [currentPage])
    const handlePrevious = () => {
    setCurrentPage(previousPage);
    }
    const handleNext = () => {
    setCurrentPage(nextPage);
    
    }

    if(loading) return <h1>Loading...</h1>
    return(
        <>
            {!loading && pokemons.map(pokemon => <h1>{pokemon.name}</h1>)}
            {!loading && previousPage && <button onClick={handlePrevious}>Previous</button>}
            {!loading && nextPage && <button onClick={handleNext}>Next</button>}
        </>
    )
}

export default Landing;