import {Link, useLocation} from 'react-router-dom'
import {useDispatch} from "react-redux"

import {setMovieId} from "../../redux/slice/movieSlice"

import {IMovie} from '../../types/movie'
import {AnimatePresence, motion} from "framer-motion";

import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'

import pathImg from '../../utils/pathImg'
import sliceString from "../../utils/sliceString"

import PlugImg from '../../resources/img/plugimg.png'

import styles from './itemMovie.module.scss'
import {FC, memo} from "react"
import StateMovieSidebar from "../../containers/stateMovieSidebar/StateMovieSidebar";
import {useAppSelector} from "../../hooks/hook";


const ItemMovie: FC<IMovie> = memo(({title, name, poster_path, backdrop_path, vote_average, id, minHeightImg}) => {


    const params = useLocation();
    const pathLink = params.pathname.includes(`/movie`) ? `/../movie/${id}` : `movie/${id}`;
    const dispatch = useDispatch();
    const onChangeMovieId = (id: number) => {
        dispatch(setMovieId(id))
    };
    const imgMovie = poster_path ? pathImg(poster_path) : backdrop_path ? pathImg(backdrop_path) : PlugImg;
    const titleMovie = title ? sliceString(title) : name ? sliceString(name) : 'нет имени';

    const {auth} = useAppSelector(state => state.auth);
    return (
        <AnimatePresence>
            <motion.div
                key={id}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                whileHover={{y: -10}}
                transition={{
                    type: 'Tween',
                    opacity: {duration: 1.5},

                }}

            >
                <Card
                    className={styles.root}>
                    <Tooltip arrow placement="top" title="more">
                        <CardMedia
                            onClick={() => {
                                onChangeMovieId(id)
                            }}
                            style={{minHeight: minHeightImg}}
                            component="img"
                            className={styles.images}
                            image={imgMovie}
                            alt={titleMovie}/>
                    </Tooltip>
                    <Link style={{textDecorationLine: 'none'}} to={pathLink}>
                        <Button
                            className={styles.button}
                            variant="contained"
                        >
                            link
                        </Button>
                    </Link>
                    {auth ? <div className={styles.sidebar}>
                        <StateMovieSidebar idMovie={id}/>
                    </div> : null}

                </Card>

            </motion.div>

        </AnimatePresence>
    );
});

export default ItemMovie;

