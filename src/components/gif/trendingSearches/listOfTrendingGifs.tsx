import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { responseTrendingGif } from '../../../services/giphy/settings';
import getTrendingGifs from '../../../services/giphy/getTrendingsGifs';
import { TrendingGifsType } from '.';

 const TrendingGifs = ({setSearch}: TrendingGifsType) => {
    const [trends, setTrends] = useState<responseTrendingGif>();

    useEffect(()=>{
        getTrendingGifs().then((x)=> setTrends(x));
    }, []);

    const handleLi = (e: any) =>{
        e.preventDefault();
        const target= e.target.firstChild.wholeText;
        setSearch(target);
    }

    return (
        <StyledUl>
            {trends && trends.data.map( (item, index) => <li key={index} onClick={handleLi}> {item} </li> )}
        </StyledUl>
    );
};

export default TrendingGifs;


const StyledUl = styled.ul`
    overflow: auto;
    display: flex;
    flex-direction: row; 
    flex-wrap: wrap; 
    gap: 8px; 
    justify-content: center;

    & li {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border: 1px solid #ccc;
        padding: 4px;
        display: flex;
        justify-content: center;
        max-height: 16px;
        cursor: pointer;

        &:hover {
        background-color: white;
        justify-content: center;
        align-items: center;
    }
    }

`
