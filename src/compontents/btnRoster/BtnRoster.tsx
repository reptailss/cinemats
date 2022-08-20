import React from 'react';
import styles from "./styles.module.scss";
import ListIcon from '@mui/icons-material/List';
import {ListItemIcon} from "@mui/material";

const BtnRoster = () => {
    return (
        <div className={styles.btn}>
            <span>edit lists</span>
            <ListItemIcon>
                <ListIcon/>
            </ListItemIcon>
        </div>
    )
};

export default BtnRoster;