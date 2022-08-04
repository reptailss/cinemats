import React, {FC} from 'react';
import {useGetFavoriteQuery} from '../../services/MovieService'
import {useAppSelector} from "../../hooks/hook";
import ListMovie from "../../compontents/listMovie/ListMovie";
import styles from './favorite.module.scss'
import {Link} from "react-router-dom";
import NotAuth from "../../compontents/notAuth/NotAuth";



const Favorite: FC = () => {
    const session_id = localStorage.getItem('session_id');
    const {user, auth} = useAppSelector(state => state.auth);

    const {data, isLoading, isError} = useGetFavoriteQuery({
        params: {
            id: user?.id,
            session_id: session_id,
            page: 1,
            sort:'created_at.desc',
        }
    }, {skip: !session_id || !auth});


    const content = auth && !data?.results.length ?
        <div className={styles.text}>you have not added movies to your favorites yet...</div> : auth && data ?
            <ListMovie
                minHeightImg={140}
                data={data.results}
                isError={isError}
                isLoading={isLoading}/> :
            <NotAuth text={'to display the favorites bar'}/>;

    const linkAll = auth && data?.results.length ? <Link className={styles.link} to={'/favorite'}>
        <span> See all</span>
    </Link> : null;

    return (
        <div className={styles.root}>

            {auth ? <div className={styles.title}>
                the last thing you added to your favorites:
            </div> : null
            }
            {content}
            {linkAll}
        </div>
    );
};

export default Favorite;