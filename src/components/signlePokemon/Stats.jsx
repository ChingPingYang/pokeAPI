import React from 'react';
import styled from 'styled-components';

const Stats = ({pokemon}) => {
    return (
        <Wrapper >
            <BasicWrap>
                <div className="box">
                    <h3>{pokemon.stats[0].base_stat}</h3>
                    <h4 style={{marginLeft:"2px"}}>HP</h4>
                </div>
                <div className="box">
                    <h3 >{pokemon.weight / 10}<span>kg</span></h3>
                    <h4>Weight</h4>
                </div>
                <div className="box">
                    <h3>{pokemon.height / 10}<span>m</span></h3>
                    <h4>Height</h4>
                </div>
            </BasicWrap>
            <AbilitiesWrap type={pokemon.types[0].type.name}>
                {pokemon.abilities.map((ability, index) => <h3 key={index}>{ability.ability.name.toUpperCase()}</h3>)}
                <h4>Abilities</h4>
            </AbilitiesWrap>
            <StatsWrap>
                <div className="box">
                    <h3>{pokemon.stats[1].base_stat}</h3>
                    <h4>Attact</h4>
                </div>
                <div className="box">
                    <h3 >{pokemon.stats[2].base_stat}</h3>
                    <h4>Defense</h4>
                </div>
                <div className="box">
                    <h3>{pokemon.stats[3].base_stat}</h3>
                    <h4>Sp.Atk</h4>
                </div>
                <div className="box">
                    <h3>{pokemon.stats[4].base_stat}</h3>
                    <h4>Sp.Def</h4>
                </div>
                <div className="box">
                    <h3>{pokemon.stats[5].base_stat}</h3>
                    <h4>Speed</h4>
                </div>
            </StatsWrap>
        </Wrapper>
    )

}

const Wrapper = styled.div`
    width: 100%;
    padding: 0px 10px;
`
const BasicWrap = styled.div`
    width: 100%;
    height: 20px;
    display: flex;
    margin-bottom:30px;
    .box {
        flex:1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h3 {
            font-weight: 300;
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
const AbilitiesWrap = styled.div`
    width: 100%;
    height: 100px;
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: solid 1px ${props => props.theme.border};
    border-bottom: solid 1px ${props => props.theme.border};
    h3 {
        margin-top: -15px;
        font-size: 0.9rem;
        height: 10px;
        font-style: italic;
        text-decoration: underline; 
        color: ${props => props.theme[props.type]};
    }
    h4{
        bottom: 15px;
        position: absolute;
        font-weight: 300;
        font-size: 0.8rem;
        color: ${props => props.theme.gray};
    }
`
const StatsWrap = styled.div`
    width: 100%;
    height: 10px;
    margin-top: 30px;
    display: flex;
    margin-bottom:30px;
    .box {
        flex:1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h3 {
            font-weight: 400;
            font-size: 1rem;
            margin-bottom: 8px;
        }
        h4 {
            font-weight: 300;
            font-size: 0.8rem;
            color: ${props => props.theme.gray};
        }
        :nth-child(2n) {
            border-left: solid 1px ${props => props.theme.border};
            border-right: solid 1px ${props => props.theme.border};
        }
    }
`
export default Stats;