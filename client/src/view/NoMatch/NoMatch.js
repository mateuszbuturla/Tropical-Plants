import React from 'react';
import styled from 'styled-components';

const Container = styled.footer`
    width: 90%;
    text-align: center;
    margin: 20vh auto
`;

const H2 = styled.h2`
    font-size: 120px;
    color: #de200b;
`;

const P = styled.p`
    font-size: 25px;
`;

const NoMatch = () => {
    document.title = 'Tropical Plants - 404'
    return (
        <Container>
            <H2>404</H2>
            <P>Strona nie odnaleziona</P>
        </Container>
    );
}

export default NoMatch;