import {configureStore} from '@reduxjs/toolkit'
import movie from "../slice/movieSlice"
import filter from '../slice/filterSlice'
import auth from '../slice/authSlice'
import snackBars from '../slice/snackBarsSlice'


import {movieApi} from "../../services/MovieService"



export const store = configureStore({
    reducer: {
        movie, filter, auth,snackBars,
        [movieApi.reducerPath]: movieApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(movieApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;