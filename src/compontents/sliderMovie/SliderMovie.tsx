import {FC, memo} from "react";

import {IMovie} from "../../types/movie";
import {ISlider} from "../../types/slider";
import {Navigation} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import ItemMovie from '../itemMovie/ItemMovie'
import SkeletonMovie from "../skeletonMovie/SkeletonMovie"

import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/scrollbar";
import './slider.scss'

interface ISliderMovieProps extends ISlider {
    data: IMovie[],
    minHeightImg: number,
    status?: string
}

const SliderMovie: FC<ISliderMovieProps> = memo(({data, spaceBetween, breakpointsProp, isLoading, minHeightImg,status}) => {

        const itemsSlide = data.map((item) => {
            return (
                <SwiperSlide key={item.id}>
                    <ItemMovie
                        {...item}
                        minHeightImg={minHeightImg}
                    />
                </SwiperSlide>
            )
        });

        const skeletons = [...new Array(10)].map((_, index) => {
            return (
                <SwiperSlide key={index}>
                    <SkeletonMovie height={minHeightImg}/>
                </SwiperSlide>
            )
        });

        return (
            <Swiper
                breakpoints={breakpointsProp}
                modules={[Navigation]}
                navigation
                spaceBetween={spaceBetween}
            >
                {isLoading || status === 'pending' ? skeletons : itemsSlide}
            </Swiper>
        )
    }
);

export default SliderMovie;