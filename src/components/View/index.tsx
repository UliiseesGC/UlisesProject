import React, { ReactNode } from "react";
import ViewStyle from "./style";

type ViewProps = {
    children?: ReactNode;
    positiony?: 'start' | 'center' | 'end';
    positionx?: 'left' | 'center' | 'right';
}

const View = ({positionx, positiony, children}:ViewProps) => {

    //some logic

    return (
    <ViewStyle positiony={positiony} positionx={positionx}>
        {children}
    </ViewStyle>
)};

export default View;

