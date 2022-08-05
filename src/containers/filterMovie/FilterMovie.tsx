import {useGetFilteredMovieQuery} from '../../services/MovieService'
import {setTotalPage} from '../../redux/slice/filterSlice'

import ListSearch from "../../compontents/listSearch/ListSearch"
import Pagination from "../../compontents/Pagination/Pagination"
import {useAppDispatch, useAppSelector} from "../../hooks/hook";
import {FC, memo} from "react";
import NoResults from "../../compontents/noResults/NoResults";


const FilterMovie: FC = memo(() => {

    const dispatch = useAppDispatch();

    const {filterProps} = useAppSelector(state => state.filter);
    const {page} = useAppSelector(state => state.filter);

    const {withGenres} = filterProps;
    const genresString = withGenres.toString();

    const {data, isLoading,status} = useGetFilteredMovieQuery({
        filterProps: {...filterProps, withGenres: genresString}, page
    });

    dispatch(setTotalPage(data?.total_pages));

    const pagination = data ? data.total_pages > 1 ? <Pagination/> : null : null;

    return (
        <>

            {data?.results?.length ? <ListSearch
                status={status}
                isLoading={isLoading}
                lenghtOverview={350}
                data={data.results}
            /> : <NoResults/>}
            {pagination}
        </>
    )


});

export default FilterMovie;



