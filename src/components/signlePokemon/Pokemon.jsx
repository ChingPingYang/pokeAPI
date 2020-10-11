import React, { useEffect, useState } from 'react';
import { getOnePokemon } from '../../util/pokemonAPI';
import styled from 'styled-components';
import { capitalize } from '../../util/utilFuns';
import icon from '../../icons/bug.svg';

const Pokemon = ({ match: { params }}) => {
    
    const [pokemon, setPokemon] = useState();
    const [loading ,setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        let mounted = true;
        async function loadPokemon() {
            try {
                const res = await getOnePokemon(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
                setPokemon(res);
                setLoading(false);
                console.log('go:',res)
            } catch(err) {
                setError(err)
            }
        } 
        
        if(mounted) loadPokemon();

        return () => {
            mounted = false
        }
    }, []);

    if(error) {
        return <Loading>{error}</Loading>
      } else if(loading){
        return <Loading>Loading...</Loading>
    }

    return (
        <Wrapper type={pokemon.types[0].type.name} typeDim={`${pokemon.types[0].type.name}Dim`}>
            <ContentWrap >
                <ImgWrap >
                    <img src={pokemon.sprites.front_default} alt={pokemon.name}></img>
                </ImgWrap>
                <h1>{capitalize(pokemon.name)}</h1>
                {pokemon.types.map((type, index) => {
                    return (
                        <Type key={index} type={type.type.name}>
                            <div className="icon">
                                <img src={require(`../../icons/${type.type.name}.svg`)}></img>
                            </div>
                            <h3>{capitalize(type.type.name)}</h3>
                        </Type>
                    )
                })}
                <StatsWrap >
                    <div className="box">
                        <h3>{pokemon.id}</h3>
                        <h4 style={{marginLeft:"6px"}}>No.</h4>
                    </div>
                    <div className="box">
                        <h3 >{pokemon.weight / 10}<span>kg</span></h3>
                        <h4>Weight</h4>
                    </div>
                    <div className="box">
                        <h3>{pokemon.height / 10}<span>m</span></h3>
                        <h4>Height</h4>
                    </div>
                </StatsWrap>
            </ContentWrap>
        </Wrapper> 
    )
}

const Wrapper = styled.div`
    width: 100%;
    flex-grow: 1;
    display: flex;
    align-items: flex-end;
    padding: 0px 3rem;
    background-image: linear-gradient(to left bottom,${props=> props.theme[props.type]}, ${props=> props.theme[props.typeDim]});
    
`

const ContentWrap = styled.div`
    height: 60%;
    width: 100%;
    text-align: center;
    background-color: white;
    h1 {
        font-size: 2.5rem;
    }
`
const ImgWrap = styled.div`
    height: 10%;
    width: 100%;
    border: solid 1px red;
    display: flex;
    justify-content: center;
    img {
        height: 16rem;
        margin-top: -200px;
        z-index: 1000;
    }
`
const Type = styled.div`
    display: inline-block;
    margin: 15px 10px 30px 10px;
    /* border: solid 1px red; */
    
    .icon {
        width: 3.3rem;
        height: 3.3rem;
        border-radius: 100%; 
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${props => props.theme[props.type]};
        img {
            width: 60%;
        }
    }
    h3 {
        margin-top: 5px;
        font-size: 0.9rem;
        font-weight: 300;
    }
`
const StatsWrap = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    
    .box {
        flex:1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h3 {
            font-weight: 400;
            font-size: 1.2rem;
            margin-bottom: 8px;
            span {
                margin-left: 2px;
            }
        }
        h4,span {
            font-weight: 400;
            font-size: 0.8rem;
            color: ${props => props.theme.gray};
        }
        :nth-child(2) {
            border-left: solid 1px ${props => props.theme.border};
            border-right: solid 1px ${props => props.theme.border};
        }
    }
`


const Loading = styled.h1`
  color: ${props => props.theme.gray};
  font-size: 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default Pokemon;