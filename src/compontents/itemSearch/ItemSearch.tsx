import React, {FC, memo} from 'react';
import {setMovieId} from "../../redux/slice/movieSlice"
import {Link} from "react-router-dom"
import {useAppDispatch} from "../../hooks/hook";
import {AnimatePresence, motion} from "framer-motion";
import {useAppSelector} from "../../hooks/hook";

import {Col, Row} from 'react-bootstrap'

import {IMovie} from "../../types/movie";

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import pathImg from '../../utils/pathImg'
import PlugImg from '../../resources/img/plugimg.png'
import sliceString from '../../utils/sliceString'


import styles from './itemSearch.module.scss'
;
import StateMovieSidebar from "../../containers/stateMovieSidebar/StateMovieSidebar";

interface ItemSearchProps extends IMovie {
    lenghtOverview: number
}


const ItemSearch: FC<ItemSearchProps> = memo(({title, name, poster_path, backdrop_path, id, overview, lenghtOverview}) => {

    const dispatch = useAppDispatch();

    const {auth} = useAppSelector(state => state.auth);

    const onChangeMovieId = (id: number) => {
        dispatch(setMovieId(id))
    };

    const imgMovie = poster_path ? pathImg(poster_path) : backdrop_path ? pathImg(backdrop_path) : PlugImg;
    const titleMovie = title ? title : name ? name : 'нет имени';

    const overviewDesc = lenghtOverview ? sliceString(overview, lenghtOverview) : overview;

    return (
        <AnimatePresence>
            <motion.div
                key={id}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{
                    type: 'Tween',
                    opacity: {duration: 1.5},
                }}
                className={styles.root}
                onClick={() => {
                    onChangeMovieId(id)
                }}>
                <Row className={styles.row}>
                    <Col className={styles.innerImg} xl={3}>
                        <Link className={styles.link} to={`../movie/${id}`}>
                            <Tooltip arrow placement="right" title="more">
                                <CardMedia
                                    component="img"
                                    className={styles.images}
                                    image={imgMovie}
                                    alt={titleMovie}/>
                            </Tooltip>
                        </Link>
                    </Col>
                    <Col xl={9}>
                        <CardContent className={styles.box}>
                            <Typography
                                component="div"
                                className={styles.title}>
                                {titleMovie}
                            </Typography>

                            <div className={styles.over}>
                                {overview ? overviewDesc : 'no review'}
                            </div>

                            {auth ? <div className={styles.sidebar}>
                                <StateMovieSidebar idMovie={id}/>
                            </div> : null}

                        </CardContent>
                    </Col>
                </Row>
            </motion.div>
        </AnimatePresence>
    );
});

export default ItemSearch;

