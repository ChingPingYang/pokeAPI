import React from 'react';
import styled from 'styled-components';
import { capitalize } from '../../util/utilFuns';

const Card = ({pokemon}) => {
    const { id, name, sprites, types, height, weight } = pokemon;
    
    return (
        <Wrapper>
            <ImgWrap type={types[0].type.name} typeDim={`${types[0].type.name}Dim`}>
                <img src={sprites.front_default} alt={name}></img>
            </ImgWrap>
            <ContentWrap>
                <h1>{capitalize(name)}</h1>
                {types.map((type, index) => <Type key={index} type={type.type.name}>{capitalize(type.type.name)}</Type>)}
                <StatsWrap >
                    <div className="box">
                        <h3>{id}</h3>
                        <h4 style={{marginLeft:"6px"}}>No.</h4>
                    </div>
                    <div className="box">
                        <h3 >{weight / 10}<span>kg</span></h3>
                        <h4>Weight</h4>
                    </div>
                    <div className="box">
                        <h3>{height / 10}<span>m</span></h3>
                        <h4>Height</h4>
                    </div>
                </StatsWrap>
            </ContentWrap>
        </Wrapper>    
    )
}

const Wrapper = styled.div`
    height: 340px;
    flex-basis: 285px;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    overflow: hidden;
    margin: 0px 10px 2rem 10px;
`
const ImgWrap = styled.div`
    height: 40%;
    width: 100%;
    display: flex;
    justify-content: center;
    background-image: linear-gradient(to left bottom,${props=> props.theme[props.type]}, ${props=> props.theme[props.typeDim]});
    img {
        height: 115%;
        margin-top: 20px;
        z-index: 1000;
    }
`
const ContentWrap = styled.div`
    height: 60%;
    width: 100%;
    text-align: center;
    background-color: white;
    h1 {
        margin-top: 25px;
        font-size: 2rem;
    }
`
const Type = styled.div`
    color: white;
    display: inline-block;
    margin: 15px 5px 30px 5px;
    padding: 3px 10px;
    background-color: ${props => props.theme[props.type]};
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 300;
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
    


export default Card;