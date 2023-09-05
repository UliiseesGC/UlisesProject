import React from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

export type GifProps = {
    id: string;
    title: string;
    url: string;
    large?: string;
    wide?: string;
}

const Gif = ({id, title, url, wide, large}: GifProps)=> {
    const navigate = useNavigate();
    return(
        
        <GifBox onClick={() => navigate(`/practice/giphy-page/${id}`)} wide={wide} large={large}>
            <h4>{title}</h4>
            <img id={id} src={url} alt={title}/>
        </GifBox>
    )
};

const GifBox = styled.div<{wide?: string, large?: string}>`
    position: relative;
    border-radius: 4px;
    cursor: pointer;
    height: ${({large}) => large ? large : 'fit-content'};
    width: ${({wide}) => wide ? wide : 'fit-content'};
    background: black;
    min-height: 200px;
    min-width: 200px;
    flex-grow: 1;
    /* flex-basis: 100px; */

    & h4 {
        position: absolute;
        background: rgba(0, 0, 0, .2);
        bottom: 0;
        font-size: 16px;
        color: yellow;
        margin: 0;
    } 
    & img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
        object-fit: contain;
        vertical-align: top;
    }

    &:hover {
        /* position: absolute; */
        /* width: 600px; */
        /* height: 600px; */
        /* position: relative */
    }
`

export default Gif;
