import { API_GIPHY_KEY, API_GIPHY_URL, responseTrendingGif } from "./settings";

const fromApirResponseGifs = (apiResponse: responseTrendingGif) => {
    const data: responseTrendingGif = apiResponse;
    return data;
};

const getTrendingGifs = async () => {    
    const API_URL = `${API_GIPHY_URL}/trending/searches?api_key=${API_GIPHY_KEY}`;
    
    return await fetch(API_URL)
        .then((res: Response) => res.json())
        .then(fromApirResponseGifs) 
};

export default getTrendingGifs;