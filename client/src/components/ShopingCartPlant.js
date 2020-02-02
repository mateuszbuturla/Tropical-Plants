import React from 'react';
import styled from 'styled-components';

import BinIcon from '../img/bin.png';

const Container = styled.div`
    margin-bottom: 20px;
    text-align: left;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    padding-right: 20px;
    border-bottom: 1px solid #707070
`;

const PlantName = styled.p`
    font-size: 25px;
`;

const Amount = styled.p`
    font-size: 18px;
    margin-right: 10px
`;

const AddSubtract = styled.p`
    font-size: 25px;
    margin-right: 10px;
    cursor: pointer;
`;

const Price = styled.p`
    font-size: 25px; 
    width: 50px;
`;

const Div1 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Div2 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Action = styled.div`
    display: flex;
    align-items: center;
`;

const Bin = styled.img`
    width: 30px;
    height: 30px;
    cursor: pointer;
`;

function ShopingCartPlant(props) {
    return (
        <Container>
            <Div1>
                <PlantName>{props.plant.name}</PlantName>
                <Action>
                    <AddSubtract onClick={e => props.subtractOneProduct(e, props.plant._id)}> - </AddSubtract>
                    <Amount>{props.amount}</Amount>
                    <AddSubtract onClick={e => props.addToShopingCart(e, props.plant._id)}> + </AddSubtract>
                </Action>
            </Div1>
            <Div2>
                <Price>{props.amount * Number(props.plant.price)}zł</Price>
                <Bin src={BinIcon} alt="wyrzyć" onClick={e => props.removePlantFromShopingCart(e, props.plant._id)} />
            </Div2>
        </Container>
    );
}

export default ShopingCartPlant;