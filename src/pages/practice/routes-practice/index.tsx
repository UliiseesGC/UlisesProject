import { useContext } from "react";
import { Context } from "../../../context/GifsContext";

const RoutesPractice = () => {
    const asd = useContext(Context);
    const {gifs} = asd;

    return (
    <>
        In this component, I will attempt to practice with 'react-router-dom'. 
        Despite the fact that I have used and practiced routes in this app, 
        I will focus specifically on practicing routes, nested routes, 
        passing arguments, etc... in this part of the app.
        This practice may be related to other practices, such as 'type practice' and 'abstraction practice.
    </>)
}

export default RoutesPractice;