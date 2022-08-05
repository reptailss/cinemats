import React, {FC, memo} from 'react';

import {Paper} from '@mui/material';

import {IMovie} from "../../types/movie";


import './sidebarmovie.scss'


const MovieView: FC<IMovie> = memo(({ original_title, status, budget, original_language}) => {


    return (
        <>

            <Paper className="sidebar-movie"
                   elevation={24}
            >
                <div className="sidebar-movie__item">
                    <div className="sidebar-movie__item-info title-2">
                        Original title
                    </div>
                    <div className="sidebar-movie__item-content text">
                        {original_title ? original_title : ''}
                    </div>
                </div>
                <div className="sidebar-movie__item">
                    <div className="sidebar-movie__item-info title-2">
                        status
                    </div>
                    <div className="sidebar-movie__item-content text">
                        {status ? status : '-'}
                    </div>
                </div>
                <div className="sidebar-movie__item">
                    <div className="sidebar-movie__item-info title-2">
                        Budget
                    </div>
                    <div className="sidebar-movie__item-content text">
                        {budget ? budget + '$' : '-'}
                    </div>
                </div>
                <div className="sidebar-movie__item">
                    <div className="sidebar-movie__item-info title-2">
                        Original language
                    </div>
                    <div className="sidebar-movie__item-content text">
                        {original_language ? original_language : '-'}
                    </div>
                </div>
            </Paper>
        </>
    )
});

export default MovieView;