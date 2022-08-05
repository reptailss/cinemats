import {memo} from 'react';

import {setGenre} from '../../redux/slice/filterSlice'

import styles from './genres.module.scss'
import {useAppDispatch, useAppSelector} from "../../hooks/hook";
import {useGetGenresMovieQuery} from '../../services/MovieService'


const Genres = memo(() => {

        const {filterProps} = useAppSelector(state => state.filter);
        const dispatch = useAppDispatch();
        const {data} = useGetGenresMovieQuery('');

        const genresItems = data?.genres.map((item) => {

            const {name, id} = item;
            const clazz = filterProps.withGenres.includes(id) ? styles.item + ' ' + styles.active : styles.item;

            return (
                <div onClick={() => dispatch(setGenre(id))}
                     className={clazz}
                     key={id}>{name}
                </div>
            )
        });

        return (
            <div className={styles.list}>
                {genresItems}
            </div>
        );
    }
);

export default Genres;