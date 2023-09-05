import styled from 'styled-components';

type BoxViewProps = {
    wide?: string;
    large?: string;
}

export const BoxView = styled.div<BoxViewProps>`
    height: ${({large}) => large ? large : '100%'};
    width: ${({wide}) => wide ? wide : '100%'};;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;

    &:before {
        /* content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: black;
        z-index: -1; */
    };
    ::-webkit-scrollbar {
        width: 10px;
        background: black;
        border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: white;
        border-radius: 4px;
        ::-webkit-scrollbar {
        background: white;
        }
    }
`

