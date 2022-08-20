import React, {FC, memo} from 'react';
import {Link} from "react-router-dom"
import {Col, Row} from "react-bootstrap"
import Button from '@mui/material/Button';

import pathImg from "../../utils/pathImg"
import sliceRalease from "../../utils/sliceRalease"
import sliceString from "../../utils/sliceString"

import GenresList from '../../compontents/genresList/GenresList'

import plugImg from "../../resources/img/plugimg.png"
import plugCinema from "../../resources/img/cinema.jpg"
import './movieBlock.scss'

import {IMovie} from "../../types/movie";
import StateMovieSidebar from "../../containers/stateMovieSidebar/StateMovieSidebar";
import {useAppSelector} from "../../hooks/hook";

const MovieInfoView: FC<IMovie> = memo(({id, title, name, poster_path, backdrop_path, vote_average, release_date, genres, budget, overview}) => {
    const {auth} = useAppSelector(state => state.auth);
    const backdropMovie = backdrop_path ? pathImg(backdrop_path) : plugImg;
    const posterMovie = poster_path ? pathImg(poster_path) : plugImg;
    const titleMovie = title ? title : name ? name : 'нет имени';
    const raleaseMovie = sliceRalease(release_date);
    const overviewMovie = sliceString(overview, 350);
    const styleBackdrop = backdrop_path ? {
        backgroundImage: `url(${backdropMovie})`,
        filter: 'blur(3.57px)'
    } : {backgroundImage: `url(${plugCinema})`}
    const styleContent = backdrop_path ? {color: '#ffff'} : {color: '#ffff'};
    const voteMovie = Math.round(vote_average);

    return (
        <>
            <div className="movie-block__info">
                <div className="movie-block__backdrop"
                     style={styleBackdrop}
                />
                <Row className="movie-block__info-inner">
                    <Col className={"movie-block__inner-img"} sm={6} xl={5}>
                        <img className="movie-block__img" src={posterMovie} alt={titleMovie}/>
                        <div className="movie-block__content-rating">
                            {voteMovie}
                        </div>
                    </Col>
                    <Col sm={6} xl={7}>
                        <div style={styleContent} className="movie-block__content">
                            {auth ? <div className="movie-block__sidebar">
                                <StateMovieSidebar idMovie={id}/>
                            </div> : null}
                            <div className="movie-block__title">
                                {titleMovie} ({raleaseMovie})
                            </div>
                            <div className="movie-block__genres mt-1">
                                <GenresList data={genres}/>
                            </div>
                            <div className="movie-block__text-2 mt-1">
                                Budget: {budget ? budget + '$' : 'unknown'}
                            </div>
                            <div className="mt-3 movie-block__text-2">
                                {overview ? 'Review:' : ''}
                            </div>
                            <div className="mt-1 movie-block__text">
                                {overview ? overviewMovie : 'no review'}
                            </div>
                            <Link className={'linkBtn'}
                                  to={`movie/${id}`}>
                                <Button
                                    className={'button'}
                                    variant="contained"
                                >
                                    MORE
                                </Button>
                            </Link>

                        </div>


                    </Col>
                </Row>


            </div>
        </>
    );
});

export default MovieInfoView;