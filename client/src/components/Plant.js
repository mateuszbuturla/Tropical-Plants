import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    margin-bottom: 50px;
    text-align: left;
    width: 100%;
    @media (min-width: 560px)
    {
        width: 45%;
    }

    @media (min-width: 1400px)
    {
        width: 30%;
    }
`;

const PlantName = styled.p`
    text-transform: uppercase;
    position: relative;
    display: inline;
    font-size: 20px;
    ::before
    {
        content: '';
        position: absolute;
        bottom: -5px;
        right: -5px;
        top: 50%;
        left: 40%;
        background-color: #94F273;
        z-index: -1;
    }

    @media (min-width: 760px)
    {
        font-size: 25px;
        ::before
        {
            bottom: -10px;
            right: -10px;
        }
    }

    @media (min-width: 1366px)
    {
        font-size: 35px;
    }
    @media (min-width: 1400px)
    {
        font-size: 30px;
    }
`;

const Img = styled.img`
    width: 100%;
    margin-top: 15px;
    transform: scale(1);
    transition: .7s;

    @media (min-width: 760px)
    {
        margin-top: 25px
`;

function Plant(props) {
    return (
        <Container>
            <PlantName>{props.plant.name}</PlantName>
            <Img src={process.env.PUBLIC_URL + `/plants/${props.plant.imgsrc}`} />
        </Container>
    );
}

export default Plant;