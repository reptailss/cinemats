import React, {FC} from 'react';
import {
    useAddItemRosterMutation,
    useGetStatusRosterQuery,
    useRemoveItemRosterMutation
} from '../../../../services/MovieService'
import styles from "./styles.module.scss";
import SpinnerBlock from "../../../../compontents/spinner/Spinner";
import {useSnackBar} from "../../../../hooks/useSnackBars";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {AnimatePresence, motion} from "framer-motion";
import RatingSidebar from "../../../stateMovieSidebar/StateMovieSidebar";


interface IRosterItemProps {
    movie_id: number,
    list_id: number,
    name: any

}

const RosterItem: FC<IRosterItemProps> = ({movie_id, list_id, name}) => {

    const {setSnackBar} = useSnackBar();

    const session_id = localStorage.getItem('session_id');

    const [addItemRoster] = useAddItemRosterMutation();
    const [removeItemRoster] = useRemoveItemRosterMutation();

    const {data, status, isLoading} = useGetStatusRosterQuery({
            params: {
                movie_id,
                list_id
            }
        },
        {skip: !movie_id || !list_id});


    const styleItem = data?.item_present ? {
            backgroundColor: `#0288d1`,
            color: 'blue'
        }
        : {backgroundColor: 'rgba(255,255,255, .5)'};


    const addItem = async () => {

        if (session_id) {
            try {
                const res = await addItemRoster({
                    body: {media_id: movie_id},
                    params: {
                        session_id,
                        list_id
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

    const removeItem = async () => {

        if (session_id) {
            try {
                const res = await removeItemRoster({
                    body: {media_id: movie_id},
                    params: {
                        session_id,
                        list_id
                    }

                });
                // @ts-ignore
                if (res?.data) {
                    setSnackBar('you have successfully removed an item from the list!', 'info');
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


    const onClickItem = () => {
        if (data?.item_present) {
            removeItem();
        } else {
            addItem();
        }
    };


    const disabled = status === 'pending';

    const content = data ?
            <motion.div
                key={name}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{
                    type: 'Tween',
                    opacity: {duration: 0.7},
                }}
                style={styleItem}
                className={styles.item}>
                <button
                    disabled={disabled}
                    onClick={onClickItem}
                    className={styles.button}
                >
            <span className={styles.btnName}>
                     {name}
            </span>
                    <span className={styles.btnIcon}>
                  {data?.item_present ? <DeleteIcon/> : <AddIcon/>}
            </span>

                </button>

            </motion.div>
        : <SpinnerBlock/>;

    return (
        <>
            {content}
        </>
    );
};

export default RosterItem;