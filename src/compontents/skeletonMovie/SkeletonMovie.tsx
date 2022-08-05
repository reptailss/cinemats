import React, {FC, memo} from 'react';
import Skeleton from '@mui/material/Skeleton';

interface ISkeletonMovieProps {
    height?: number
}

const SkeletonMovie: FC<ISkeletonMovieProps> = memo(({height = 160}) => {
    return (
        <>
            <Skeleton variant="rectangular"
                      width={'100%'}
                      height={height}
                      sx={{bgcolor: 'grey.900'}}
            />
            <Skeleton
                variant="text"
                width={'100%'}
                height={24}
                sx={{bgcolor: 'grey.900'}}
            />
        </>
    );
});

export default SkeletonMovie;