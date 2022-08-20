import React, {FC} from 'react';
import {
    useGetStatusRosterQuery,
} from '../../../../services/MovieService'
import styles from "./styles.module.scss";
import SpinnerBlock from "../../../../compontents/spinner/Spinner";
import {useRoster} from '../../../../hooks/useRoster'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {motion} from "framer-motion";

interface IRosterItemProps {
    movie_id: number,
    list_id: number,
    name: string
}

const RosterItem: FC<IRosterItemProps> = ({movie_id, list_id, name}) => {

    const {addItemMovie, removeItemMovie} = useRoster();
    const {data, status} = useGetStatusRosterQuery({
            params: {
                movie_id,
                list_id
            }
        },
        {skip: !movie_id || !list_id});


    const styleItem = data?.item_present ? {
            backgroundColor: `#0288d1`,
        }
        : {backgroundColor: 'rgba(255,255,255, .5)'};


    const onClickItem = () => {
        if (data?.item_present) {
            removeItemMovie(list_id,movie_id)
        } else {
            addItemMovie(list_id,movie_id);
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