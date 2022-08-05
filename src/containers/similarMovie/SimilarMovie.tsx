import React, {FC, memo} from 'react';
import {useGetMovieSimilarQuery} from '../../services/MovieService'

import SliderMovie from '../../compontents/sliderMovie/SliderMovie'
import ErrorMessage from '../../compontents/errorMessage/ErrorMessage'

import {defaultBreakpoints} from "../../constans/breakpoints";

import style from './similarMovie.module.scss'
import {useAppSelector} from "../../hooks/hook";


interface SimilarMovieProp {
    breakpointsProp: {}
}

const SimilarMovie: FC<SimilarMovieProp> = memo(({breakpointsProp}) => {

    const {movieId} = useAppSelector(state => state.movie);
    const {data, isLoading, isError,status} = useGetMovieSimilarQuery(movieId);
    const breakpointsValue = breakpointsProp ? breakpointsProp : defaultBreakpoints;
    const dataResults = data ? data.results : [];
    const content = isError ?
        <ErrorMessage/> :
        <SliderMovie
            status={status}
            isLoading={isLoading}
            spaceBetween={10}
            breakpointsProp={breakpointsValue}
            data={dataResults}
            minHeightImg={261}
        />;
    return (
        <>
            <div className={style.similarMovie}>
                <div className={style.title}>related movies to this:
                </div>
                {content}
            </div>
        </>
    )
});

export default SimilarMovie;