
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface IInitialState {
    movieId: number
}
const initialState: IInitialState = {
    movieId: 453395,
};

export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        setMovieId(state, action:PayloadAction<number>) {
            state.movieId = action.payload
        },
    },

});

export const {setMovieId} = movieSlice.actions;

export default movieSlice.reducer;