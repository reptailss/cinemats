import React, {FC, useEffect} from 'react';

import {Container} from "react-bootstrap"
import {useAppDispatch, useAppSelector} from "../../hooks/hook";
import {useGetFavoriteQuery} from "../../services/MovieService";
import styles from "../../containers/favorite/favorite.module.scss";
import {setTotalPage} from '../../redux/slice/filterSlice'

import ListSearch from '../../compontents/listSearch/ListSearch'
import Pagination from "../../compontents/Pagination/Pagination";
import NotAuth from "../../compontents/notAuth/NotAuth";
import {dataSelectFavoriteSort} from "../../constans/buttons";
import Sortblock from "../../compontents/sort/sortBlock/sortblock";


const PageFavorite: FC = () => {
    const session_id = localStorage.getItem('session_id');
    const {user, auth} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const {page, filterProps} = useAppSelector(state => state.filter);

    const {data, isLoading, isError,status} = useGetFavoriteQuery({
        params: {
            id: user?.id,
            session_id: session_id,
            page: page,
            sort: filterProps.sort,
        }
    }, {skip: !session_id || !auth});

    useEffect(() => {
        if (auth && data) {
            dispatch(setTotalPage(data.total_pages))
        }
    }, [data]);



    const content = auth && !data?.results.length ?
        <div className={styles.text}>you have not added movies to your favorites yet...</div> : auth && data ?
            <>

                <Sortblock
                    defaultTitle={'Created at asc'}
                    defaultlValue={'created_at.asc'}
                    dataSelect={dataSelectFavoriteSort
                    }/>
                <ListSearch
                    lenghtOverview={1000}
                    data={data.results}
                    isError={isError}
                    status={'fulfilled'}
                    isLoading={isLoading}/>
            </>
            :
            <NotAuth text={'to display your favorite movies'}/>;


    return (
        <Container className={styles.root}>

            {auth ? <div className={styles.title}>
                complete list of your favorites
            </div> : null
            }
            {content}

            <Pagination/>
        </Container>

    );
};

export default PageFavorite;