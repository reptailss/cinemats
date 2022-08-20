import {FC, memo} from 'react';

import {Col, Container, Row} from "react-bootstrap"
import Rating from '@mui/material/Rating';

import pathImg from "../../utils/pathImg"
import sliceRalease from "../../utils/sliceRalease"

import GenresList from '../../compontents/genresList/GenresList'

import plugImg from "../../resources/img/plugimg.png"
import plugCinema from "../../resources/img/cinema.jpg"
import './movie.scss'
import {IMovie} from "../../types/movie";
import StateMovieSidebar from "../../containers/stateMovieSidebar/StateMovieSidebar";
import {useAppSelector} from "../../hooks/hook";


const MovieView: FC<IMovie> = memo(({title, name, poster_path, backdrop_path, vote_average, release_date, genres, overview,id}) => {
    const {auth} = useAppSelector(state => state.auth);
        const backdropMovie = backdrop_path ? pathImg(backdrop_path) : plugImg;
        const posterMovie = poster_path ? pathImg(poster_path) : plugImg;
        const titleMovie = title ? title : name ? name : 'нет имени'
        const raleaseMovie = sliceRalease(release_date);

        const styleBackdrop = backdrop_path ? {
            backgroundImage: `url(${backdropMovie})`,
            filter: 'grayscale(50%) blur(6px)',
            WebkitFilter: 'grayscale(50%) blur(6px)'
        } : {backgroundImage: `url(${plugCinema})`}

        const styleContent = backdrop_path ? {color: '#ffff'} : {color: '#ffff'};

        return (
            <>
                <div className="movie__info">


                    <div className="movie__backdrop" style={styleBackdrop}/>
                    <Container className="movie__wrapper">
                        <Row className="movie__info-inner justify-content-between">
                            <Col className={"movie__inner-img"} sm={12} xl={3}>

                                <div className="movie__content-rating">
                                    <Rating size="small"
                                            readOnly
                                            name="customized-10"
                                            defaultValue={vote_average ? vote_average : 1}
                                            max={10}
                                    />
                                </div>
                                <img className="movie__img"
                                     src={posterMovie}
                                     alt={titleMovie}/>
                            </Col>
                            <Col sm={12} xl={8}>
                                <div style={styleContent} className="movie__content">
                                    {auth ? <div className="movie__sidebar">
                                        <StateMovieSidebar idMovie={id}/>
                                    </div> : null}
                                    <div className="movie__title fw-bold">
                                        {titleMovie} <span className='fw-200 title'>({raleaseMovie})</span>
                                    </div>
                                    <div className="movie__genres mt-4">
                                        Genres:
                                    </div>
                                    <div className="movie__genres text mt-1 px-3">
                                        <GenresList data={genres}/>
                                    </div>
                                    <div className="mt-3">
                                        {overview ? 'Review:' : ''}
                                    </div>
                                    <div className="mt-1  text px-3">
                                        {overview ? overview : 'no review'}
                                    </div>

                                </div>

                            </Col>
                        </Row>

                    </Container>
                </div>
            </>
        );
    }
);

export default MovieView;