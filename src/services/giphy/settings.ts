
export const API_GIPHY_KEY = 'a41W3yolnTYJwhMYULnrZU8I8HR4kC0P&q';

// export const API_GIPHY_TRENDING_KEY = 'a41W3yolnTYJwhMYULnrZU8I8HR4kC0P&q';

export const API_GIPHY_URL = 'https://api.giphy.com/v1'

export type responseGif = {
    data: Array<{ images: { fixed_height : { url: string }}, title: string, id: string }> 
};

export type responseTrendingGif = {
    data: string[];
};
