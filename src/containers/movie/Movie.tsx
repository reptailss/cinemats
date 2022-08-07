import {useGetMovieQuery} from '../../services/MovieService'
import {useParams} from 'react-router-dom'
import MovieView from "../../UI/movieView/MovieView";
import SkeletonMovie from "../../compontents/skeletonMovie/SkeletonMovie";
import {FC, memo} from "react";
import {motion} from "framer-motion";


const Movie: FC = memo(() => {
        const {movieId} = useParams();

        const {data,status} = useGetMovieQuery(Number(movieId));

        const content = status === 'pending' ? <SkeletonMovie height={382}/> : data ? <MovieView {...data}/> : null;

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
    }
);

export default Movie;