import {useGetMovieQuery} from '../../services/MovieService'
import {useAppSelector} from "../../hooks/hook";
import MovieInfoView from "../../UI/movieInfoView/MovieInfoView";
import SkeletonMovie from "../../compontents/skeletonMovie/SkeletonMovie";
import {FC, memo} from "react";
import { motion} from "framer-motion";


const MovieInfo: FC = memo(() => {

    const {movieId} = useAppSelector(state => state.movie);

    const {data, status} = useGetMovieQuery(movieId);

    const content =  status === 'pending' ? <SkeletonMovie height={420}/> : data && status === 'fulfilled' ?
        <MovieInfoView {...data}/> : null;

    return (
            <motion.div
                key={data?.id}
                initial={{opacity: 0}}
                animate={{opacity: 1}}

                transition={{
                    type: 'Tween',
                    opacity: {duration: 1.5},

                }}
            >
                {content}
            </motion.div>
    );
});

export default MovieInfo;