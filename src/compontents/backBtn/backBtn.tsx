import React from 'react';
import styles from "./backBtn.module.scss";
import {useNavigate} from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackBtn = () => {
    const navigate = useNavigate();
    return (

        <span className={styles.root}>
            <button className={styles.btn} onClick={() => {
                navigate(-1)
            }}>
                <ArrowBackIcon/>
                <span>Back</span>

            </button>
        </span>
    )
};

export default BackBtn;