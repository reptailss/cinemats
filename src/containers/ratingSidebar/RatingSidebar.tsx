import {FC} from 'react';
import Rating from '@mui/material/Rating';
import {useMakeRatingMutation} from '../../services/MovieService'
import {useSnackBar} from "../../hooks/useSnackBars";

interface IRatingSidebarProps {
    movieId: number,
    valueRating: false | {
        value: number
    }
}

const session_id = localStorage.getItem('session_id');

const RatingSidebar: FC<IRatingSidebarProps> = ({movieId, valueRating}) => {
    const {setSnackBar} = useSnackBar();

  const value = valueRating === false ? null : valueRating.value;

    const [makeRating,] = useMakeRatingMutation();


    const onMakeRating = async (newValue: number | null) => {
        if (session_id) {
            try {
                await makeRating({
                    body: {
                        value: newValue
                    },
                    params: {
                        session_id: session_id,
                        id: movieId
                    }
                });
                setSnackBar(`you rated the movie ${newValue} stars!`, 'success');
            } catch (e: any) {
                setSnackBar(e.status_message, 'error');
            }
        }

    };

    return (
        <div>
            <div>your mark</div>
            <Rating
                size="small"
                name="simple-controlled"
                value={value}
                max={10}
                onChange={(event, newValue) => {
                    onMakeRating(newValue)
                }}
            />

        </div>
    );
};

export default RatingSidebar;