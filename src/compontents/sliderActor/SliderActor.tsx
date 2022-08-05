import React, {FC, memo} from "react";
import {Navigation, Scrollbar} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import ItemActor from '../itemActor/ItemActor'

import {actorsBreakpoints} from "../../constans/breakpoints";

import {ISlider} from "../../types/slider";
import {IActor} from "../../types/actors";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ISliderMovieProps extends ISlider {
    data: IActor[],
}

const SliderActor: FC<ISliderMovieProps> = memo(({data, slidesPerView, spaceBetween}) => {

    const itemsSlide = data.map((item, i) => {

        const {name, profile_path, character, id} = item;

        if (i > 15) {
            return
        }
        return (
            <SwiperSlide key={id}>
                <ItemActor
                    name={name}
                    profile_path={profile_path}
                    character={character}
                    id={id}
                />
            </SwiperSlide>
        )
    });
    return (
        <Swiper
            breakpoints={actorsBreakpoints}
            scrollbar={{
                hide: false,
                draggable: true,
            }}
            modules={[Navigation, Scrollbar]}
            navigation
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
        >
            {itemsSlide}
        </Swiper>

    )
});

export default SliderActor;