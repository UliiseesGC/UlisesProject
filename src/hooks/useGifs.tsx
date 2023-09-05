import { useEffect, useState, useContext } from "react";
import getGifs from "../services/giphy/getGifs";
import { Context } from "../context/GifsContext";


const useGifs = (search: string) => {
    // const [gifs, setGifs] = useState<{id: string, title: string, url: string}[]>([]);
    const [loadingGifs, setLoadingGifs] = useState(false);
    const contentGifs = useContext(Context);
    const {gifs, setGifs} = contentGifs;

    useEffect(()=> {
        setLoadingGifs(true);
        search = (search === '') ? 'hello' : search;
        getGifs(search).then(
            gifs => {
                setGifs(gifs);
                if (gifs[0] === undefined) setLoadingGifs(false);
            });
    }, [search]);

    return {gifs, loadingGifs};

};


export default useGifs;