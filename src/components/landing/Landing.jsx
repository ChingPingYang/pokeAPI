import React, { useEffect, useState } from "react";
import { getPokemons, getOnePokemon } from "../../util/pokemonAPI";
import styled from "styled-components";
import Card from "./Card";

const Landing = () => {
  const [previousPage, setPreviousPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPage, setNextPage] = useState(null);
  const [pokemons, setPokemons] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    async function loadPokemons() {
      try {
        const res = await getPokemons(currentPage);
        setPreviousPage(res.previous);
        setNextPage(res.next);

        const pokemonList = await Promise.all(
          res.results.map((i) => getOnePokemon(i.url))
        );

        if (mounted) {
          setPokemons(pokemonList);
          setLoading(false);
        }
      } catch (err) {
        console.log("E:", err);
        setError(err);
      }
    }
    loadPokemons();

    return () => {
      mounted = false;
    };
  }, [currentPage]);
  const handlePrevious = () => {
    setCurrentPage(previousPage);
  };
  const handleNext = () => {
    setCurrentPage(nextPage);
  };

  if (error) {
    return <Loading>{error}</Loading>;
  } else if (loading) {
    return <Loading>{`Loading... Please give me few seconds. :)`}</Loading>;
  }

  return (
    <Wrapper>
      <CardsWrap>
        {!loading &&
          pokemons?.map((pokemon) => (
            <Card key={pokemon.id} pokemon={pokemon}>
              {pokemon.name}
            </Card>
          ))}
      </CardsWrap>
      <PaginationWrap>
        {!loading && previousPage && (
          <button onClick={handlePrevious}>Previous</button>
        )}
        {!loading && nextPage && <button onClick={handleNext}>Next</button>}
      </PaginationWrap>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  width: 100%;
  display: flex;
  padding: 30px 3rem;
  flex-direction: column;
  align-items: center;
`;

const CardsWrap = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const PaginationWrap = styled.section`
  width: 70%;
  display: flex;
  justify-content: space-around;
  button {
    -moz-appearance: none;
    -webkit-appearance: none;
    padding: 0.5rem 2rem;
    border-radius: 5px;
    font-size: 1rem;
    color: ${(props) => props.theme.interactive};
    border: solid 2px ${(props) => props.theme.interactive};
    box-shadow: 0px 3px 8px -3px ${(props) => props.theme.interactive};
    cursor: pointer;
    transition: 0.2s ease-in-out;
    :hover {
      color: white;
      background-color: ${(props) => props.theme.interactive};
    }
  }
`;

const Loading = styled.h1`
  color: ${(props) => props.theme.gray};
  font-size: 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default Landing;
