import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {userInitial} from "../../constans/user";

import {IUser} from "../../types/user";


interface IInitialState {

    request_token: string | null,
    password: string,
    username: string,
    auth: boolean,
    session_id: string,
    user: IUser,

}

const initialState: IInitialState = {
    session_id: '',
    request_token: '',
    username: '',
    password: '',
    auth: false,
    user: userInitial
};


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action) {
            state.request_token = action.payload
        },
        setAuth(state, action) {
            state.auth = action.payload
        },
        setSession_id(state, action) {
            state.session_id = action.payload
        },
        setUser(state, action) {
            state.user = action.payload
        },


    },


});


export const {setToken, setAuth, setSession_id, setUser} = authSlice.actions;

export default authSlice.reducer;