import React, { useEffect, useState } from 'react';
import { getOnePokemon } from '../../util/pokemonAPI';
import styled from 'styled-components';
import { capitalize, getSlideName } from '../../util/utilFuns';
import Stats from './Stats';
import { media } from '../../style/media';

const Pokemon = ({ match: { params }, history}) => {
    const [sprite, setSprite ] = useState(0);
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
            } catch(err) {
                history.push('/404');
                setError(err)
            }
        } 
        
        if(mounted) loadPokemon();

        return () => {
            mounted = false
        }
    }, [params]);

    const handleSlide = (e) => {
        if(e.target.id === "next"){
            setSprite(pre => {
                if(pre === 3) {
                    return 0
                } else {
                    return pre + 1
                }
            });
        } else if(e.target.id === "previous"){
            setSprite(pre => {
                if(pre === 0) {
                    return 3
                } else {
                    return pre - 1
                }
            });
        }
    }

    if(error) {
        return <Loading>{error}</Loading>
      } else if(loading){
        return <Loading>{`Loading... Please give me few seconds. :)`}</Loading>
    }

    return (
        <Wrapper type={pokemon.types[0].type.name} typeDim={`${pokemon.types[0].type.name}Dim`}>
            <ContentWrap >
                <ImgWrap >
                    <img src={pokemon.sprites[getSlideName(sprite)]} alt={pokemon.name}></img>
                    <button id="previous" className="slideBtn previous" onClick={handleSlide}>&#8592;</button>
                    <button id="next" className="slideBtn next" onClick={handleSlide}>&#8594;</button>
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
                <Stats pokemon={pokemon} />
            </ContentWrap>
        </Wrapper> 
    )
}

const Wrapper = styled.div`
    width: 100%;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 0px 1rem;
    background-image: linear-gradient(to left bottom,${props=> props.theme[props.type]}, ${props=> props.theme[props.typeDim]});
`

const ContentWrap = styled.div`
    height: 60%;
    width: 100%;
    text-align: center;
    background-color: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    ${media.mobile_l} {
        height: 65%;
        ${media.tablet} {
            height: 68%;
            ${media.laptop_s} {
                width: 70%;
                ${media.laptop_l} {
                    height: 60%;
                }
            }
        }
    }
    h1 {
        font-size: 2.5rem;
    }
`
const ImgWrap = styled.div`
    height: 210px;
    width: 20rem;
    position: relative;
    display: inline-block;
    overflow: hidden;
    margin-top: -200px;
    ${media.mobile_l} {
        height: 230px;  
        width: 23rem;
        ${media.laptop_l} {
            height: 300px;  
            margin-top: -400px;
            width: 25rem;
        }
    }
    img {
        height: 16rem;
        transition: 1s ease-in-out;
        ${media.tablet} {
            height: 15rem;
            transform: translateY(-10px);
            ${media.laptop_l} {
                height: 16rem;
            }
        }
    }
    .slideBtn {
        all: unset;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        padding: 5px;
        color: ${props => props.theme.interactive};
        border-radius: 100%;
        background-color: white;
        cursor: pointer;
        transition: 0.2s ease-in-out;
        :hover {
            color: white;
            background-color: ${props => props.theme.interactive};
        }
    }
    .previous {
        left: 0px;
    }
    .next {
        right: 0px;
    }
`
const Type = styled.div`
    display: inline-block;
    margin: 15px 10px 30px 10px;
    
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

const Loading = styled.h1`
  color: ${props => props.theme.gray};
  font-size: 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default Pokemon;