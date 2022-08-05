import {FC, memo} from 'react';
import {useGetActorsMovieQuery} from '../../services/MovieService'
import SliderActors from '../../compontents/sliderActor/SliderActor'

import styles from './actors.module.scss'

interface IActorsProps {
    movieId: number
}

const Actors: FC<IActorsProps> = memo(({movieId}) => {
        const {data, isLoading} = useGetActorsMovieQuery(movieId);

        const dataCast = data ? data.cast : [];

        const content = isLoading ? 'loading..' : <SliderActors
            data={dataCast}
            slidesPerView={7}
            spaceBetween={10}
        />;

        return (
            <div className={'actors'}>
                <div className={styles.root}>
                    <div className="title">Starring</div>
                    {content}
                </div>

            </div>

        )
    }
);

export default Actors;