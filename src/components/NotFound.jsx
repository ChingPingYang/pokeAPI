import React from 'react';
import styled from 'styled-components';

const NotFound =() => {  
    return (
        <Wrapper>
            <NotFoundMsg>
                Sorry... we can't find this pokemon.
            </NotFoundMsg> 
        </Wrapper>
    )
}

const Wrapper = styled.main`
  width: 100%;
  display: flex;
  padding: 30px 3rem;
  flex-direction: column;
  align-items: center;
`

const NotFoundMsg = styled.h1`
  color: ${props => props.theme.gray};
  font-size: 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default NotFound;