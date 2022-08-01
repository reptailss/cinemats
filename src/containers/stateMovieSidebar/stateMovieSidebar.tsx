import * as React from 'react';
import {FC, useEffect} from 'react';
import {useLazyGetStateMovieQuery, useMakeFavoriteMutation,} from '../../services/MovieService'

import {useAppDispatch, useAppSelector} from "../../hooks/hook";

import {setMessage, setOpenSnack, setVariant} from '../../redux/slice/snackBarsSlice'

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


import styles from './stateMovieSidebar.module.scss'
import {useSnackBar} from "../../hooks/useSnackBars";


interface IMakeFavoriteProps {
    idMovie: number
}

const StateMovieSidebar: FC<IMakeFavoriteProps> = ({idMovie}) => {

    const session_id = localStorage.getItem('session_id');
    const [makefavorite, {}] = useMakeFavoriteMutation();
    const [getStateMovie, {data}] = useLazyGetStateMovieQuery();
    const {user} = useAppSelector(state => state.auth);


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const dispatch = useAppDispatch();

    const onRequestStateMovie = async () => {
        if (session_id) {
            const {data, isLoading, isError, error} = await getStateMovie({
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
            console.log('res')
        }
    };

    const onSnack = () => {
        if (data?.favorite) {
            dispatch(setMessage('you removed from favorites!'));
            dispatch(setVariant('info'));
            dispatch(setOpenSnack(true));
        } else {
            dispatch(setMessage('you have successfully added to favorites!'))
            dispatch(setVariant('success'));
            dispatch(setOpenSnack(true));
        }


    };

    const colorFavoriteIcon = data?.favorite ? 'primary' : 'disabled';
    const textFavorite = data?.favorite ? 'remove from favorites' : 'add to favorite';

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
                    <div className={styles.item}>
                        {textFavorite}
                        <FavoriteBorderIcon
                            className={styles.button}
                            fontSize={'small'}
                            color={colorFavoriteIcon}/>
                    </div>

                </MenuItem>

                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>

            </Menu>
        </>
    );
};

export default StateMovieSidebar;