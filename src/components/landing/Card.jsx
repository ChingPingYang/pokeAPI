import React from 'react';
import styled from 'styled-components';
const Card = ({pokemon}) => {
    const { id, name, sprites, types, height, weight } = pokemon;
    return (
        <Wrapper>
            <ImgWrap>
                <img src={sprites.front_default} alt={name}></img>
            </ImgWrap>
            <ContentWrap>

            </ContentWrap>
        </Wrapper>    
    )
}

const Wrapper = styled.div`
    height: 340px;
    flex-basis: 285px;
    display: flex;
    flex-direction: column;
    border: 1px solid pink;
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 2rem;
`
const ImgWrap = styled.div`
    height: 45%;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: purple;
    img {
        height: 115%;
        margin-top: 40px;
        border: solid 2px red; 
    }
`
const ContentWrap = styled.div`
    height: 55%;
    width: 100%;
    border: solid 1px red;
`
    


export default Card;