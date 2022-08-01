import React from 'react';
import {useAuth} from "../../hooks/useAuth";
import styles from './signOut.module.scss';
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';

const SiginOut = () => {
    const {out} = useAuth();

    return (
        <>
            <button className={styles.btn} onClick={() => out()}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </button>

        </>
    );
};

export default SiginOut;