import React from 'react';
import Values from '.';

const ObtenerValor = <T extends Record<string, string | number | string[] | number[]>>(dataList: T, symbol?: string, textIsEmpty?: string)=> {
    if (dataList.length === 0) {
        return;
    }
    // const components =  dataList.map((item, index) => {
        const elements = [];
        for (const key in dataList) {
            if (dataList.hasOwnProperty(key)) {
                const propertyName = key;
                const propertyValue = dataList[propertyName];
                elements.push(Values({name: propertyName, value:propertyValue, symbol: symbol ? symbol : '', textIfEmpty: textIsEmpty}));
            };
        };
        return (
            <div >
                {/* <p> Elemento {index}</p> */}
                {elements}
            </div>
        )
    // });
    // return components;
};

export default ObtenerValor;

