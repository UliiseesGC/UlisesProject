import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import Home from '../pages/home';
import RoutesPractice  from '../pages/practice/routes-practice';
import Practice from '../pages/practice';
import TypesPractice from '../pages/practice/types-practice';
import ErrorPage from '../pages/ErrorPage';
import GiphyPage from '../pages/projects/giphy';
import ProjectsPages from '../pages/projects';
import { GifsContextProvider } from '../context/GifsContext';
import OneGiphyPage from '../pages/projects/giphy/id';
import EstudioPlazaPage from '../pages/estudio-plaza';

const router = createBrowserRouter (createRoutesFromElements(
    <>
        <Route path='*' element={<Navigate to={'/home'} replace />} /> 
        <Route path='/home' element={<Home />} />
        <Route path='practice' element={
            <GifsContextProvider>
                <Practice />
            </GifsContextProvider>
        }>
            <Route index element={<RoutesPractice />} />
            <Route path='routes-practice' element={<RoutesPractice />} />
            <Route path='type' element={<TypesPractice />} />
            <Route path='abstraccion' element={<RoutesPractice />} />
            <Route path='giphy-page' element={<GiphyPage />} />
            <Route  path='giphy-page/:id' element={<OneGiphyPage />}/>   
            <Route path='estudio-plaza' element={<EstudioPlazaPage />} /> 
        </Route>
        <Route path='/projects' element={<ProjectsPages /> } />
    </>
));

export const Routes = () => {
    return <RouterProvider router={router} />;
}
