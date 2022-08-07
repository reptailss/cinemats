import React, {FC, memo, useEffect, useState} from 'react';

import {ITrailer} from "../../types/trailer";

import {useGetVideoMovieQuery} from '../../services/MovieService'

import PlayIcon from "../../resources/icons/playIcon/PlayIcon"
import Modal from "../modal/Modal"
import YouTube from 'react-youtube';

import style from './trailerItem.module.scss'


interface ITrailerItemProps {
    index?: number,
    id: number,
    full?: boolean

}

const TrailerItem: FC<ITrailerItemProps> = memo(({index, id, full}) => {

    const {data} = useGetVideoMovieQuery(id);

    const [trailer, setTrailer] = useState<ITrailer>();
    const [play, setPlay] = useState(false);

    useEffect(() => {
        if (id && data) {
            setTrailer(data.results[0]);
        }

    }, [id, data]);

    const srcImg = `https://i.ytimg.com/vi/${trailer?.key ? trailer.key : 'HhIl_XJ-OGA'}/hqdefault.jpg`;
    const img = id ? <img className={style.img} src={srcImg} alt=""/> : null;
    const video = play ? <YouTube
        videoId={trailer?.key}
    /> : null;

    const onOpen = (open: boolean) => {
        setPlay(open)
    };


    return (
        <>
            <div className={style.item}>

                {trailer ? img : null}

                <Modal ButtonIcon={<PlayIcon/>} classNameButtonClick={style.btn} onOpen={onOpen}>
                    <YouTube
                        videoId={trailer?.key}
                    />
                </Modal>
                <div className={style.title}>
                    {trailer?.name}
                </div>
            </div>
        </>
    )
});

export default TrailerItem;