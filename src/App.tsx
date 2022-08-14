import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import {useAuth} from './hooks/useAuth'
import {useAppSelector} from "./hooks/hook";

import Home from './pages/home/Home'
import PagesMovie from './pages/pagesMovie/PagesMovie'
import PageSearch from "./pages/pageSearch/PageSearch"
import PageFilters from './pages/pageFilters/PageFilters'

import Header from './UI/header/Header'
import './App.scss';
import PageSignIn from "./pages/pageSignIn/PageSignIn";
import SnackBars from "./compontents/snackBar/snackBar";
import PageFavorite from "./pages/pageFavorite/PageFavorite";
import PageList from "./pages/pageRosters/PageRosters";
import Page404 from "./pages/404/Page404";
import PageNewRoster from "./pages/pageNewRoster/PageNewRoster";
import PagesRoster from "./pages/pagesRoster/PagesRoster";

const App = () => {

    const {auth} = useAppSelector(state => state.auth);
    const {getUser} = useAuth();
    useEffect(() => {
        getUser()
    }, [auth]);

    return (
        <>
            <BrowserRouter>
                <Header/>
                <SnackBars/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/movie/:movieId" element={<PagesMovie/>}/>
                    <Route path="/search" element={<PageSearch/>}/>
                    <Route path="/filters" element={<PageFilters/>}/>
                    <Route path="/signin" element={<PageSignIn/>}/>
                    <Route path="/favorite" element={<PageFavorite/>}/>
                    <Route  path="/list" element={<PageList/>}/>
                    <Route  path="/list/:listId" element={<PagesRoster/>}/>
                    <Route  path="/list/new" element={<PageNewRoster/>}/>
                    <Route path="*" element={<Page404/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
};
export default App;
