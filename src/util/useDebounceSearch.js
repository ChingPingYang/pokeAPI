import React from "react";
import { getPokemons } from "./pokemonAPI";

const useDebounceSearch = (value, delay) => {
  const [match, setMatch] = React.useState([]);
  const isMounted = React.useRef(false);
  // This memo will be passed to the debounce function. For the actual function to filter search result.
  // Has to be in the ref object. Otherwise the value will be the initial valu.
  const memoRef = React.useRef(value);
  // Debounce function
  const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };
  // Actual API call function
  const loadPokemons = async (value) => {
    try {
      const res = await getPokemons(
        `https://pokeapi.co/api/v2/pokemon?limit=1050`
      );
      const pokemonList = res.results.filter((pokemon) =>
        pokemon.name.includes(value.current.toLocaleLowerCase())
      );
      setMatch(pokemonList);
      console.log(pokemonList);
    } catch (err) {
      console.log(err);
    }
  };
  // Memoized return debounce function
  const optimizedLoadPokemons = React.useCallback(
    debounce(loadPokemons, delay)(memoRef),
    []
  );
  React.useEffect(() => {
    memoRef.current = value;
    if (isMounted.current) {
      if (memoRef.current.length !== 0) {
        optimizedLoadPokemons();
      } else {
        // If the search value is "", return empty array.
        setMatch([]);
      }
    }
    isMounted.current = true;
  }, [value]);

  return [match];
};

export default useDebounceSearch;
