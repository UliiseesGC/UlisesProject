import React, { Suspense, useRef } from 'react';
import useNearScreen from '../../../hooks/useNearScreen';

const TreandingSearches = React.lazy(
    ()=> import('./listOfTrendingGifs')
)

export type TrendingGifsType = {
    setSearch: (searc: string) => void;
}

const LazyTrendingGifs = ({setSearch}: TrendingGifsType) =>  {
    const {isNearScreen, element}= useNearScreen();

    return (
    <div ref={element}>
        <Suspense fallback={'Loading...'}>
            {isNearScreen ? <TreandingSearches setSearch={setSearch}/> : null}
        </Suspense>
    </div>)
};

export default LazyTrendingGifs;


