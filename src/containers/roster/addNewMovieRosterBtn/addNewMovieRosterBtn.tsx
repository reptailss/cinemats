import React, {FC} from 'react';
import styles from './addbtn.module.scss'
import {useAppSelector} from "../../../hooks/hook";
import {useRoster} from "../../../hooks/useRoster";

interface IAddNewMovieRosterBtnProps {
    movieId: number
}
const AddNewMovieRosterBtn:FC<IAddNewMovieRosterBtnProps> = ({movieId}) => {

    const {addItemMovie} = useRoster();
    const {rosterId} = useAppSelector(state => state.roster);
    return (
        <div
            onClick={() => {addItemMovie(rosterId,movieId)}}
            className={styles.btn}>
            add
        </div>

    );
};

export default AddNewMovieRosterBtn;