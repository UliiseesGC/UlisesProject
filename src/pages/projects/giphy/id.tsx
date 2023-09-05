import React, { useEffect } from 'react';
import { BoxView } from '../../../components/View/BoxViews';
import { useNavigate, useParams } from 'react-router-dom';
import Gif from '../../../components/gif/gif';
import StyledButton from '../../../components/button';
import useContextGif from '../../../hooks/useContextGifs';

const OneGiphyPage = () => {
    const {id} = useParams();
    const gifs = useContextGif();
    const navigate = useNavigate();
    const searchGif = gifs.filter((gif) => (gif.id === id) ? gif : undefined );

    useEffect(()=> {
        if (searchGif[0] === undefined){
            navigate('/practice/giphy-page');
        }
    }, []);

    return (
        <>
            <BoxView large="200px" >
                <StyledButton onClick={() => navigate('/practice/giphy-page')}>
                    Giphy page
                </StyledButton>
            </BoxView>
            <BoxView style={{overflow: 'hidden'}}>
                {searchGif[0] !== undefined &&
                    <Gif 
                        id={searchGif[0].id}
                        title={searchGif[0].title}
                        url={searchGif[0].url}
                        wide='600px'
                        large='600px'
                    />
                }
             </BoxView>
        </>
        
    )
};

export default OneGiphyPage;