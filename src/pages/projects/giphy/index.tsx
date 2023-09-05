import React, { useState, useContext} from "react";
import ListOfGifs from "../../../components/gif/listOfGifs";
import { BoxView } from "../../../components/View/BoxViews";
import { Context } from "../../../context/GifsContext";
import LazyTrendingGifs from "../../../components/gif/trendingSearches";

const GiphyPage = () => {
    const [search, setSearch] = useState<string>('Hello');
    const [key, setKey] = useState('');

    const asd = useContext(Context);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setSearch(key);
    };

    const handleChange = (e: any)=> {
        e.preventDefault();
        setKey(e.target.value);
    };
    
    return (
        <>
            <BoxView large="120px" >
                <p style={{marginTop: '40px'}}>Giphy page</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="buscar gif"  onChange={handleChange} value={key}/>
                    <button>search</button>
                </form>
            </BoxView>
            <BoxView large="100%" wide="calc(100% - 20px)" style={{background: 'black', borderRadius: '6px', padding: '10px', marginBottom: '10px'}}>
                <ListOfGifs search={search} />
            </BoxView>
            <BoxView>
                <p style={{margin: '24px 0 0 2px'}}>Trending gifs</p>
                <LazyTrendingGifs setSearch={setSearch} />
            </BoxView>
        </>
    )
};

export default GiphyPage;