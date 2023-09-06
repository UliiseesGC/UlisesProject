import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError(); 

    return (
        <div id='error-page'>
            <p> The page doesn't exists</p>
        </div>
    )
};

export default ErrorPage;