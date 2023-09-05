import React, { useContext }from 'react';
import { Context } from '../context/GifsContext';

const useContextGif = () => {
    const {gifs} = useContext( Context );

    return gifs;
};

export default useContextGif;