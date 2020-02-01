import React from 'react';
import styled from 'styled-components';

const FooterStyle = styled.footer`
    border-top: 1px solid #707070;
    text-align: center;
    padding: 15px;
    margin-top: 90px
`;
const Footer = () => {
    return (
        <FooterStyle>
            Mateusz Buturla 2020
        </FooterStyle>
    );
}

export default Footer;