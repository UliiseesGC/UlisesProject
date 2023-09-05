import styled from 'styled-components';

export const PaletColor = {
    one: '#682842',
    two: '#800C2f',
    three: '#C70048',
    four: '#FF6744',
    five: '#FFc20F'
}

type ViewStyleProps ={
    positiony?: string;
    positionx?: string;
    color?: typeof PaletColor;
}

const ViewStyle = styled.div<ViewStyleProps>`
    width: 100%;
    /* height: 100%; */
    background-color: ${PaletColor.one};
    justify-content: ${({positionx}) => positionx ? positionx : 'center'};
    display: flex;
    align-items: ${({positiony}) => positiony ? positiony : 'center'} ;
    /* overflow-y: scroll; */
    /* flex-direction: column; */
`
export default ViewStyle;

