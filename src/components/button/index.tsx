import { on } from 'events';
import react from 'react';
import styled, { keyframes } from 'styled-components';

const backgroundImageButton = keyframes `
    0% {
        background-image: linear-gradient(to left, #f0f0f0, #ffffff);
    }
    10%{
        background-image: linear-gradient(to left, #f2f2f2, #fefefe);
    }
    20% {
        background-image: linear-gradient(to left, #f4f4f4, #fdfdfd);
    }
    30% {
        background-image: linear-gradient(to left, #f6f6f6, #fcfcfc);
    }
    40% {
        background-image: linear-gradient(to left, #f8f8f8, #fbfbfb);
    }
    50% {
        background-image: linear-gradient(to left, #fafafa, #fafafa);
    }
    60% {
        background-image: linear-gradient(to left, #fbfbfb, #f8f8f8);
    }
    70% {
        background-image: linear-gradient(to left, #fcfcfc, #f6f6f6);
    }
    80% {
        background-image: linear-gradient(to left, #fdfdfd, #f4f4f4);
    }
    90% {
        background-image: linear-gradient(to left, #fefefe, #f2f2f2);
    }
    100% {
        background-image: linear-gradient(to left, #ffffff, #f0f0f0);
    }
`

const StyledButton = styled.button<{active?: string}>`
    height: 40px;
    width: 200px;
    border-radius: 12px;
    margin: 10px 0;
    cursor: pointer;
    border: 1px solid #d6d6d6;
    background-image: ${({active}) => (active === 'true') ? 'linear-gradient(to right, #f0f0f0, #ffffff)' : 'linear-gradient(to right, #ffffff, #f0f0f0)' };
    box-shadow: #000000;
    
    &:hover  {
        animation: ${backgroundImageButton} 0.2s linear both;
    }
`;

export default StyledButton;