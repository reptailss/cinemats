import {useAppSelector} from "../../hooks/hook";

import {useGetSearchMovieQuery} from '../../services/MovieService'
import ListSearch from "../../compontents/listSearch/ListSearch"
import Pagination from "../filterMovie/FilterMovie"
import {FC, memo} from "react";

const SearchMovie: FC = memo(() => {
        const {searchValue, page} = useAppSelector(state => state.filter);

        const {data, isLoading} = useGetSearchMovieQuery({searchValue, page});

        const pagination = data ? <Pagination/> : null;
        return (
            <>
                {data?.results?.length ?
                    <ListSearch
                        lenghtOverview={1000}
                        data={data.results}
                        isLoading={isLoading}
                    /> : null}
                {pagination}
            </>
        )
    }
);

export default SearchMovie;