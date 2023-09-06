import React from 'react';
import styled from 'styled-components';
// import { Prices } from '../../pages/projects/estudio-plaza';

type ValuesProp = {
    name: string,
    value: string | string[] | number| number[], 
    symbol?: string,
    textIfEmpty?: string
}

const Values = (prop: ValuesProp) => {
    return(
        <p> {prop.name} == <Prices>{((prop.value === '' || prop.value === 0) ? prop.textIfEmpty : prop.symbol ? prop.value + prop.symbol : prop.value)}</Prices></p>
    )
};

export default Values;

const Prices = styled.p`
    font-size: 18px;
    background-color: beige;
    margin: 4px;
`