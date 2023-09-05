import React, { SetStateAction, useState } from "react";

type ContextGifsProps = {
    gifs: {id: string, title: string, url: string}[];
    setGifs: React.Dispatch<SetStateAction<{id: string, title: string, url: string}[]>>
};

const Context = React.createContext<ContextGifsProps>({} as ContextGifsProps);

interface GifsPropsProvider {
    children: JSX.Element | JSX.Element[];
}

const GifsContextProvider = ({ children }: GifsPropsProvider) => {
    const [gifs, setGifs] = useState<{id: string, title: string, url: string}[]>([]);


    return <Context.Provider value={{gifs, setGifs}}>
        {children}
    </Context.Provider>

}


export {GifsContextProvider, Context};