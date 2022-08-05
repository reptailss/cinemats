import React, {FC, memo} from 'react';

import SkeletonMovie from '../../compontents/skeletonMovie/SkeletonMovie'
import ReviewView from '../../UI/reviewView/ReviewView'
import {useGetReviewsMovieQuery} from '../../services/MovieService'

interface IReviewProps {
    movieId: number,

}

const Review: FC<IReviewProps> = memo(({movieId}) => {

    const {data, isLoading} = useGetReviewsMovieQuery(movieId);

    const content = isLoading ? <SkeletonMovie height={382}/> : data?.results?.length ? <ReviewView
        data={data.results}

    /> : null;

    return (
        <>
            {content}
        </>

    )


});

export default Review;