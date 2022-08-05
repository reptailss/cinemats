import {FC, memo} from 'react';

import {useGetMovieQuery} from '../../services/MovieService'

import SkeletonMovie from '../../compontents/skeletonMovie/SkeletonMovie'
import SidebarMovieView from '../../UI/sidebarMovieView/SidebarMovieView'
import ErrorMessage from '../../compontents/errorMessage/ErrorMessage'


interface ISidebarMovieProps {
    movieId: number
}

const SidebarMovie: FC<ISidebarMovieProps> = memo(({movieId}) => {

        const {data, isLoading, isError} = useGetMovieQuery(movieId);
        const errorMessage = isError ? <ErrorMessage/> : null;

        const content = isLoading ? <SkeletonMovie height={382}/> : data ?  <SidebarMovieView

            {...data}
        /> : null;

        return (
            <>
                {errorMessage}
                {content}
            </>

        )
    }
);

export default SidebarMovie;