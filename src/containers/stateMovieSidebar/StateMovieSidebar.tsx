import React, {FC, useEffect, useState} from 'react';
import {useLazyGetStateMovieQuery, useMakeFavoriteMutation,} from '../../services/MovieService'
import {useAppSelector} from "../../hooks/hook";
import {useSnackBar} from "../../hooks/useSnackBars";
import {AnimatePresence, motion} from "framer-motion";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import styles from './stateMovieSidebar.module.scss'
import RatingSidebar from "../ratingSidebar/RatingSidebar";
import RosterSidebar from "../roster/rosterSidebar/RosterSidebar";

interface IMakeFavoriteProps {
    idMovie: number
}

const StateMovieSidebar: FC<IMakeFavoriteProps> = ({idMovie}) => {

    const session_id = localStorage.getItem('session_id');
    const [makefavorite, {}] = useMakeFavoriteMutation();
    const [getStateMovie, {data, status}] = useLazyGetStateMovieQuery();
    const {user} = useAppSelector(state => state.auth);
    const {setSnackBar} = useSnackBar();


    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const onRequestStateMovie = async () => {
        if (session_id) {
            await getStateMovie({
                params: {
                    session_id: session_id,
                    movie_id: idMovie
                }
            });
        }
    };


    const onMakeFavorite = async (e: React.MouseEvent<HTMLOrSVGElement>) => {
        e.preventDefault();
        if (session_id) {
            await makefavorite({
                body: {
                    media_type: 'movie',
                    media_id: idMovie,
                    favorite: !data?.favorite,
                },
                params: {
                    session_id: session_id,
                    id: user.id
                }
            });
        }
    };

    const onSnack = () => {
        if (data?.favorite) {
            setSnackBar('you removed from favorites!', 'info');
        } else {
            setSnackBar('you have successfully added to favorites!', 'success');
        }

    };

    const colorFavoriteIcon = data?.favorite ? 'primary' : 'disabled';
    const textFavorite = data?.favorite ? 'remove from favorites' : 'add to favorite';

    const favoriteButton = status === 'fulfilled' ?

        <AnimatePresence>
            <motion.div
                key={idMovie}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{
                    type: 'Tween',
                    opacity: {duration: 0.7},
                }}
                className={styles.item}>
                {textFavorite}
                <FavoriteBorderIcon
                    className={styles.button}
                    fontSize={'small'}
                    color={colorFavoriteIcon}/>
            </motion.div>
        </AnimatePresence> : null;


    const rating = data && status === 'fulfilled' ?

        <AnimatePresence>
            <motion.div
                key={idMovie+1}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{
                    type: 'Tween',
                    opacity: {duration: 0.7},
                }}
                >
                <RatingSidebar valueRating={data?.rated} movieId={idMovie}/>
            </motion.div>
        </AnimatePresence> : null;


    useEffect(() => {
        if (open) {
            onRequestStateMovie();
        }
    }, [open]);

    return (
        <>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menuUser' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className={styles.buttonDots}
            >
                <MoreHorizIcon
                    color={'info'}
                    fontSize={'small'}
                />
            </Button>
            <Menu
                transitionDuration={700}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={(e) => {
                    handleClose();
                    onMakeFavorite(e);
                    onSnack();
                }}>
                    {favoriteButton}
                </MenuItem>
                <MenuItem onClick={(e) => {
                    handleClose();
                }}>
                    {rating}
                </MenuItem>
                <MenuItem>

                 <RosterSidebar movieId={idMovie} />
                </MenuItem>
            </Menu>
        </>
    );
};

export default StateMovieSidebar;