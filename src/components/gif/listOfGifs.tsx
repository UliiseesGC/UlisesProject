import {useRef} from 'react';
import Gif from "./gif";
import useGifs from "../../hooks/useGifs";
import styled from "styled-components";
import useNearScreen from "../../hooks/useNearScreen";

type ListOfGifsProps = {
  search: string;
};

const ListOfGifs = ({ search }: ListOfGifsProps) => {
  const { loadingGifs, gifs } = useGifs(search);
  const externalRef = useRef(null);
  const {isNearScreen} = useNearScreen(loadingGifs ? null : externalRef)
  // console.log(isNearScreen);

  return (
    <>
    <h2 style={{color: 'yellow'}}>{search}</h2>
      <Boxgifs>
        {loadingGifs ? (
          <>
            {gifs.map(({ id, title, url }) => (
              <Gif id={id} key={id} title={title} url={url} />
            ))}
            {/* <div id="adsasd" ref={externalRef} style={{width: '100px', height: '100px'}}> asd </div> */}
          </>
        ) : (
          <div>No GIF found with that name.</div>
        )}
      </Boxgifs>
    </>
  );
};

export default ListOfGifs;

const Boxgifs = styled.div`
  height: 600px;
  width: calc(100% - 12px);
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 10px;

  ::-webkit-scrollbar {
    width: 4px;
    background: gray;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 10px;

    ::-webkit-scrollbar {
      background: white;
    }
  }
`;
