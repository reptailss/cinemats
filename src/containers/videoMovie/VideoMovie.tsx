import React, {FC} from 'react';
import style from "../trailerMovie/trailerMovie.module.scss";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation} from "swiper";
import {videoMovieBreakpoints} from "../../constans/breakpoints";
import {useGetVideoMovieQuery} from "../../services/MovieService";
import VideoMovieItem from "../../compontents/videoMovieItem/VideoMovieItem";


interface IVideoMovieProps {
    id: number
}

const VideoMovie: FC<IVideoMovieProps> = ({id}) => {

    const {data} = useGetVideoMovieQuery(id);

    const videoItems = data?.results.map((item,i) => {
        return (
            <SwiperSlide
                key={i}>
                <VideoMovieItem
                    name={item.name}
                    keyVideo={item.key}
                />
            </SwiperSlide>
        )
    });


    return (
        <>
            <div className={style.title}>
                Available videos
            </div>
            <div className={style.inner}>
                <Swiper
                    className={'slider'}
                    slidesPerView={3}
                    modules={[Navigation, Autoplay]}
                    navigation
                    spaceBetween={30}
                    breakpoints={videoMovieBreakpoints}
                >
                    {data ? videoItems : 'loading..'}
                </Swiper>

            </div>
        </>

    );
};

export default VideoMovie;