import {useParams} from 'react-router-dom'
import {Col, Container, Row} from "react-bootstrap"
import {moviePageSimilarBreakpoints} from '../../constans/breakpoints'
import Actors from '../../containers/actors/Actors'
import SidebarMovie from '../../containers/sidebarMovie/SidebarMovie'
import Review from '../../containers/review/Review'
import SimilarMovie from "../../containers/similarMovie/SimilarMovie"
import Movie from "../../containers/movie/Movie";
import Accor from '../../compontents/accor/Accor'
import styles from './pagesMovie.module.scss'
import {FC, memo} from "react";
import VideoMovie from "../../containers/videoMovie/VideoMovie";


const PagesMovie:FC = memo(() => {
    const {movieId: id} = useParams();
    const movieId = Number(id);

    return (
        <>
            <div className={styles.root}>
                <Movie/>
                <Container>
                    <Row className='justify-content-between mt-4'>
                        <Col xl={9}><Actors movieId={movieId}/></Col>
                        <Col className={styles.marginTop70} xl={3}>
                            <SidebarMovie movieId={movieId}/>
                        </Col>
                        <Col className={styles.marginTop}  xl={9}>
                        <VideoMovie id={movieId}/>
                        </Col>
                        <Col className={styles.marginTop} xl={9}>
                            <Accor expanded title={'Reviews'}>
                                <Review movieId={movieId}/>
                            </Accor>
                        </Col>
                        <Col className={styles.marginTop} xl={9}>
                            <SimilarMovie breakpointsProp={moviePageSimilarBreakpoints} />
                        </Col>
                    </Row>
                </Container>


            </div>

        </>

    )
});

export default PagesMovie;