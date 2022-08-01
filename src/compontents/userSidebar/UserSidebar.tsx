import React from 'react'


import {useAppDispatch, useAppSelector} from "../../hooks/hook";
import {Link} from "react-router-dom";
import SiginOut from "../../containers/siginOut/SiginOut";
import styles from './userSidebar.module.scss'
import plugAvatar from '../../resources/img/user-svgrepo-com.svg'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ListItemIcon from '@mui/material/ListItemIcon';


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const UserSidebar = () => {


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const dispatch = useAppDispatch();
    const {auth, user} = useAppSelector(state => state.auth);


    return (
        <div>

            {auth && user ?
                <div className={styles.wrap}>
                    <div>
                        <div
                            id="basic-button"
                            aria-controls={open ? 'basic-menuUser' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <img className={styles.img} src={plugAvatar} alt=""/>
                        </div>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <div onClick={handleClose} className={styles.username}>{user?.username}</div>
                            <MenuItem onClick={handleClose}>
                                <Link to={'favorite'}>
                                    <ListItemIcon>
                                        <FavoriteBorderIcon fontSize="small"/>
                                    </ListItemIcon>
                                    Favorite
                                </Link>

                            </MenuItem>

                            <MenuItem onClick={handleClose}><SiginOut/></MenuItem>
                        </Menu>
                    </div>

                </div>
                :
                <Link className={styles.item} to='/signIn'>
                    Sign In
                </Link>}

        </div>
    );
};

export default UserSidebar;