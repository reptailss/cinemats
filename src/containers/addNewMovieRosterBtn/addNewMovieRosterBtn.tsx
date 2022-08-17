import React, {FC} from 'react';
import styles from './addbtn.module.scss'
import {useAppSelector,useAppDispatch} from "../../hooks/hook";

import {useAddItemRosterMutation} from '../../services/MovieService'
import {useSnackBar} from "../../hooks/useSnackBars";

interface IAddNewMovieRosterBtnProps {
    movieId: number
}

const AddNewMovieRosterBtn:FC<IAddNewMovieRosterBtnProps> = ({movieId}) => {

    const {rosterId} = useAppSelector(state => state.roster);

    const [addItemRoster] = useAddItemRosterMutation();
    const {setSnackBar} = useSnackBar();
    const session_id = localStorage.getItem('session_id');

    const onAddItemRoster = async (e: any) => {
        e.preventDefault();
        if (session_id) {
            try {
                const res = await addItemRoster({
                    body: {media_id: movieId},
                    params: {
                        session_id: session_id,
                        list_id: rosterId
                    }

                });
                // @ts-ignore
                if (res?.data) {
                    setSnackBar('you have successfully added the movie to the list!', 'success');
                    // @ts-ignore
                } else if (res?.error) {
                    // @ts-ignore
                    setSnackBar(res?.error.data.status_message, 'error')
                }

            } catch (err) {
                console.log(err);
                throw err
            }

        }
    };
    return (
        <div
            onClick={(e) => {onAddItemRoster(e)}}
            className={styles.btn}>
            add
        </div>

    );
};

export default AddNewMovieRosterBtn;