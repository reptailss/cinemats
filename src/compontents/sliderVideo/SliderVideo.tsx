import React, {FC, memo} from "react";
import {Navigation, Scrollbar} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import YouTube from 'react-youtube';
import {videoBreakpoints} from "../../constans/breakpoints";

import {ISlider} from "../../types/slider";
import {IVideo} from "../../types/video";

import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/scrollbar";
import styles from './sliderVideo.module.scss'

interface ISliderVideoProps extends ISlider {
    data: IVideo[],

}

const SliderVideo: FC<ISliderVideoProps> = memo(({data, slidesPerView, spaceBetween}) => {

        const itemsSlide = data.map((item, i) => {

            const {id, key} = item;

            const opts = {
                host: 'http://www.youtube.com',
                playerVars: {
                    'origin': 'http://localhost:3000'
                },
            };

            if (i > 3) {
                return
            }
            return (

                <SwiperSlide key={id}>
                    <YouTube
                        videoId={key}
                        opts={opts}
                    />
                </SwiperSlide>
            )
        });

        return (

            <Swiper
                className={styles.slider}
                breakpoints={videoBreakpoints}
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

    }
);

export default SliderVideo;