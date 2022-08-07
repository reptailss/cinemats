import PlayIcon from "../../resources/icons/playIcon/PlayIcon"
import Modal from "../modal/Modal"
import YouTube from 'react-youtube';
import {FC, useState} from "react";
import style from './videoItem.module.scss'

interface IVideoMovieItemProps {
    name: string,
    keyVideo: string
}

const VideoMovieItem: FC<IVideoMovieItemProps> = ({name, keyVideo}) => {

    const [play, setPlay] = useState(false);


    const srcImg = `https://i.ytimg.com/vi/${keyVideo}/hqdefault.jpg`;


    const onOpen = (open: boolean) => {
        setPlay(open)
    };

    return (
        <>
            <div className={style.item}>
                <img className={style.img} src={srcImg} alt=""/>

                <Modal ButtonIcon={<PlayIcon/>} classNameButtonClick={style.btn} onOpen={onOpen}>
                    <YouTube
                        videoId={keyVideo}
                    />
                </Modal>
                <div className={style.title}>
                    {name}
                </div>
            </div>
        </>
    )
};

export default VideoMovieItem;