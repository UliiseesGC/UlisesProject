import { API_GIPHY_KEY, API_GIPHY_URL, responseGif } from "./settings";

const fromApirResponseGifs = (apiResponse: responseGif) => {
    const {data}: responseGif = apiResponse;
    const gifs = data.map(image => {
        const { images, title, id } = image;
        const { url } = images.fixed_height;
        return {id, title, url};
    }) 
    return gifs;
};

const getGifs = async (search: string = 'morty') => {
    const API_URL = `${API_GIPHY_URL}/gifs/search?api_key=${API_GIPHY_KEY}=${search}&limit=20&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
    
    return await fetch(API_URL)
    .then((res: Response) => res.json())
    .then(fromApirResponseGifs) 
};

export default getGifs;

