
import {useState, memo, FC} from 'react';

import {useGetTrendingMovieQuery} from '../../services/MovieService'

import ErrorMessage from '../../compontents/errorMessage/ErrorMessage'
import SliderMovie from '../../compontents/sliderMovie/SliderMovie'
import RadioButtons from '../../compontents/radioButtons/RadioButtons'

import {trendingBreakpoints} from "../../constans/breakpoints";

import style from './trenging.module.scss'


const TrengingMovie: FC = memo(() => {

        const [timeMovie, setTimeMovie] = useState('day');
        const [radioChecked, setRadioChecked] = useState('day');
        const {data,isLoading,isError,status} = useGetTrendingMovieQuery(timeMovie);

        const onSetTimeMovieWeek = () => {
            setTimeMovie('week');
            setRadioChecked('week');
        };
        const onSetTimeMovieDay = () => {
            setTimeMovie('day');
            setRadioChecked('day');
        };

        const buttonsArray = [
            {value: 'week', name: 'week', checkedValue: radioChecked, onChangeInput: onSetTimeMovieWeek,},
            {value: 'day', name: 'day', checkedValue: radioChecked, onChangeInput: onSetTimeMovieDay,}
        ];

        const dataResults = data ? data.results : [];

    const content = isError ?
        <ErrorMessage/> :
        <SliderMovie
            status={status}
            minHeightImg={261}
            spaceBetween={10}
    breakpointsProp={trendingBreakpoints}
            isLoading={isLoading}
            data={dataResults}/>;

        return (
            <div className={style.trenging}>
                <div className={style.title}>
                    <RadioButtons title={'Movies are trending:'}
                                  row group={'time'}
                                  data={buttonsArray}
                                  styleInner={{
                                      justifyContent: 'space-between'
                                  }}/>
                </div>
                {content}
            </div>
        )
    }

);

export default TrengingMovie