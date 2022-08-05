import React, {FC, memo, useEffect, useRef, useState} from 'react';
import {Autoplay, Navigation} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import {useGetUpcomingMovieQuery} from "../../services/MovieService";

import {getRandom} from '../../utils/getRandom'

import TrailerItem from '../../compontents/TrailerItem/TrailerItem'
import SkeletonMovie from '../../compontents/skeletonMovie/SkeletonMovie'

import {TrailerBreakpoints} from '../../constans/breakpoints'

import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/scrollbar";
import './slider.scss'

import style from './trailerMovie.module.scss'


const TrailerMovie: FC = memo(() => {
    const {data, isLoading} = useGetUpcomingMovieQuery(1);
    const [movie, setMovie] = useState<number[]>([]);

    const ref = useRef(false);
    useEffect(() => {
        if (data) {
            data.results.map((item) => {
                if (!movie.includes(item.id)) {
                    setMovie([...movie, movie.push(item.id)]);
                }
            });
            if (movie.length > 6) {
                setMovie(getRandom(movie, 6));
            }
            ref.current = true;
        }

    }, [data]);

    const trailerItems = movie.map((id, index) => {
        return (
            <SwiperSlide
                key={index}>
                <TrailerItem
                    index={index}
                    id={id}/>
            </SwiperSlide>
        )
    });

    const skeletons = [...new Array(6)].map((_, index) => {
        return (
            <SwiperSlide key={index}>
                <SkeletonMovie height={165}/>
            </SwiperSlide>
        )
    });

    const content = isLoading ? skeletons : trailerItems;
    return (
        <>
            <div className={style.title}>
                Latest movie trailers
            </div>
            <div className={style.inner}>
                <Swiper
                    className={'slider'}
                    centeredSlides={true}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: true,
                        pauseOnMouseEnter: true,

                    }}
                    slidesPerView={3}
                    modules={[Navigation, Autoplay]}
                    navigation
                    spaceBetween={30}
                    breakpoints={TrailerBreakpoints}
                >
                    {content}
                </Swiper>

            </div>
        </>

    );

});


export default TrailerMovie;