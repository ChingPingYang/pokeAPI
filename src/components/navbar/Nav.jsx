import React , { useState, useEffect }from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getPokemons } from '../../util/pokemonAPI';
import styled from 'styled-components';
import AutoComplete from './AutoComplete';

const Nav = ({ history }) => {
    
    const [search, setSearch] = useState("");
    const [match, setMatch] = useState([]);

    useEffect(() => {
        async function loadPokemons() {
            try {
                const res = await getPokemons(`https://pokeapi.co/api/v2/pokemon?limit=1050`);
                const pokemonList = res.results.filter(pokemon => pokemon.name.includes(search.toLocaleLowerCase()));
                setMatch(pokemonList)
                console.log(pokemonList)
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
    const handleSubmit = (e) => {
        e.preventDefault();
        const pokemon = match.filter( i => i.name === search);
        if(pokemon.length < 1) return history.push('/404');
        let url = pokemon[0].url.replace('https://pokeapi.co/api/v2/','');
        return history.push(`/${url}`);
    }
    return (
        <Wrapper>
            <Link to="/" className="imageWrap"><img src={process.env.PUBLIC_URL + '/logo.png'} /></Link>
            <form className="container" onSubmit={handleSubmit}>
                <input type="text" onChange={handleOnchange} value={search} placeholder="Name of Pokemon"/>
                <svg onClick={handleSubmit} className="icon" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8.5" cy="8.5" r="7.75" stroke="#FF328C" strokeWidth="1"/>
                    <path d="M14 14L21 21" stroke="#FF328C" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {match.length > 0 && <AutoComplete data={match} reset={setSearch} />}
            </form>
        </Wrapper>
    )
}

const Wrapper = styled.nav`
    width: 100%;
    min-height: 60px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    .imageWrap{
        position: absolute;
        left: 1rem;
        width: 90px;
        img {
            width: 100%;
        }
    }
    .container {
        width: 12rem;
        height: 35px;
        border-radius: 20px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border: solid 1px ${props => props.theme.interactive};
        input {
            margin-left: 2px;
            width: 75%;
            height: 25px;
            border: none;
            background-color: none;
            outline: none;
            padding: 0;
            font-weight: 300;
        }
        .icon {
            width: 20px;
        }
    }
`


export default withRouter(Nav);