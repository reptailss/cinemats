import React, {FC} from 'react';
import styles from './addbtn.module.scss'
import {useAppSelector,useAppDispatch} from "../../hooks/hook";
import {setRosterListMovie} from "../../redux/slice/rosterSlice";

interface IAddNewMovieRosterBtnProps {
    movieId: number
}

const AddNewMovieRosterBtn:FC<IAddNewMovieRosterBtnProps> = ({movieId}) => {
    const dispatch = useAppDispatch();
    const {rosterListMovie} = useAppSelector(state => state.roster);

    const text = rosterListMovie.includes(movieId) ? 'remove' : 'add';
    return (
        <div
            onClick={() => dispatch(setRosterListMovie(movieId))}
            className={styles.btn}>
            {text}
        </div>

    );
};

export default AddNewMovieRosterBtn;