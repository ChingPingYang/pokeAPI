import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { capitalize } from '../../util/utilFuns';
import { media } from '../../style/media';
 
const AutoComplete = ({data, reset}) => {
    const history = useHistory();
    
    const handleOnclick = (e) => {
        const name = e.target.innerHTML.toLowerCase();
        const pokemon = data.filter( i => i.name === name);
        if(pokemon.length < 1) return history.push('/404');
        let url = pokemon[0].url.replace('https://pokeapi.co/api/v2/','');
        history.push(`/${url}`);
        reset("");
    }
    return (
        <Wrapper>
            <div className="select-box">
                {data.map((pokemon, index) => {
                    return (
                        <div className="option" key={index}>
                            <label htmlFor={pokemon.name} onClick={handleOnclick} >{capitalize(pokemon.name)}</label>
                            <input type="radio" name="autocomplete" id={pokemon.name} />
                        </div>
                    )
                })}
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
     width: 12rem;
     position: absolute;
     top: 55px;
     z-index: 1000;
     ${media.laptop_l}{
        width: 15rem;
        top: 65px;
     }
    .select-box{
        width: 100%;
        max-height: 250px;
        overflow-y: scroll;
        background-color: white;
        border-radius: 10px;
        border: solid 1px ${props => props.theme.interactive};
        box-shadow: 0px 3px 8px -3px ${props => props.theme.interactive};
        .option {
        
            label { 
                display: block; 
                padding: 12px 20px;
                cursor: pointer;  
            }
            input {
                position: absolute;
                top: -100px;
            }

            :hover{
                color: white;
                background-color: ${props => props.theme.interactive};
            }
        }
    }
`


export default AutoComplete;
