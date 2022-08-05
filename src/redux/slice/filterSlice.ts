import { createSlice, PayloadAction} from '@reduxjs/toolkit'



interface IInitialState {

    filterProps: {
        sort: string,
        order: string,
        releaseGte: string,
        releaseLte: string,
        video: string,
        withGenres: number[],

    },
    searchValue: string,
    genres: [],
    statusGenres: string,
    page: number,
    totalPage : number,
}

const initialState:IInitialState = {

    filterProps: {
        sort: 'popularity',
        order: 'desc',
        releaseGte: '2016-02-08',
        releaseLte: '2020-02-08',
        video: 'false',
        withGenres: [],

    },
    searchValue: '',
    genres: [],
    statusGenres: 'loading',
    page: 1,
    totalPage : 1,
};



export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setPage(state, action) {
            state.page = action.payload
        },
        setTotalPage(state, action) {
            state.totalPage = action.payload
        },
        setSearch(state, action) {
            state.searchValue = action.payload
        },
        setSort(state, action) {
            state.filterProps.sort = action.payload
        },
        setVideo(state, action) {
            state.filterProps.video = action.payload
        },
        setReleaseGte(state, action) {
            state.filterProps.releaseGte = action.payload
        },

        setReleaseLte(state, action) {
            state.filterProps.releaseLte = action.payload
        },
        setGenre(state, action) {
            const genres = state.filterProps.withGenres;
           const index = genres.indexOf(action.payload);
            if (index !== -1) {
                genres.splice(index, 1);
            } else{
                genres.push(action.payload)
            }

        },
    },





});


export const {setSearch, setSort, setVideo, setReleaseGte, setReleaseLte, setGenre,setPage,setTotalPage} = filterSlice.actions;

export default filterSlice.reducer;