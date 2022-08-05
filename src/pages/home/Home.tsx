import {Col, Container, Row} from 'react-bootstrap'


import TrendingMovie from '../../containers/trendingMovie/TrengingMovie'
import SimilarMovie from '../../containers/similarMovie/SimilarMovie'

import {similarBreakpoints} from "../../constans/breakpoints";

import style from './home.module.scss'

import TrailerMovie from "../../containers/trailerMovie/TrailerMovie";
import MovieInfo from "../../containers/movieInfo/MovieInfo";
import {FC, memo} from "react";
import Favorite from "../../containers/favorite/Favorite";


const Home: FC = memo(() => {


    return (
        <>
            <Container className={style.container}>
                <Row>
                    <Col xl={12}>
                        <TrendingMovie/>
                    </Col>
                </Row>
                <div className={style.movieRandom}>
                    <Row className={style.movieRandomRow}>
                        <Col xl={12}>
                            <div className={style.title}>
                                Simple navigation
                            </div>
                        </Col>
                        <Col xl={5}>
                            <Favorite/>
                        </Col>
                        <Col className={style.popularMovie} xl={7}>
                            <MovieInfo/>
                            <div className={style.similar}>
                                <SimilarMovie breakpointsProp={similarBreakpoints}/>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <TrailerMovie/>
                        </Col>

                    </Row>
                </div>
            </Container>
        </>
    )
});

export default Home;
