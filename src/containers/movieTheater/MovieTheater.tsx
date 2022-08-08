import {FC, memo} from 'react';

import {useGetTheaterQuery} from '../../services/MovieService'

import ErrorMessage from '../../compontents/errorMessage/ErrorMessage'
import SliderMovie from '../../compontents/sliderMovie/SliderMovie'

import {theaterBreakpoints} from "../../constans/breakpoints";

import style from './theater.module.scss'


const MovieTheater: FC = memo(() => {

        const {data, isLoading, isError, status} = useGetTheaterQuery(0);


        const dataResults = data ? data.results : [];

        const content = isError ?
            <ErrorMessage/> :
            <SliderMovie
                status={status}
                minHeightImg={261}
                spaceBetween={10}
                breakpointsProp={theaterBreakpoints}
                isLoading={isLoading}
                data={dataResults}/>;

        return (
            <div className={style.trenging}>
                <div className={style.title}>
                    Movies in theaters
                </div>
                {content}
            </div>
        )
    }
);

export default MovieTheater