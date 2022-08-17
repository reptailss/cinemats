import { createSlice, PayloadAction} from '@reduxjs/toolkit'



interface IInitialState {


    rosterId: number
    rosterListMovie: number[]
}

const initialState:IInitialState = {

    rosterId: 8213723,
    rosterListMovie: []
};



export const rosterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setRosterId(state, action) {
            state.rosterId = action.payload
        },
        setRosterListMovie(state, action) {
            const list = state.rosterListMovie;
            const index = list.indexOf(action.payload);
            if (index !== -1) {
                list.splice(index, 1);
            } else{
                list.push(action.payload)
            }

        },
    },





});


export const {setRosterListMovie,setRosterId} = rosterSlice.actions;

export default rosterSlice.reducer;