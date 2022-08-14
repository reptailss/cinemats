import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {API_KEY, API_URL, language} from "../constans/api"

import {IMovie} from "../types/movie";
import {IDataVideo} from "../types/video";
import {IDataActors} from "../types/actors";
import {IDataUpcoming} from '../types/upcoming'
import {IDataSimilar} from "../types/similar";
import {IDataFilter} from "../types/filter";
import {IDataSearch} from "../types/search";
import {IDataGenres} from "../types/genres";
import {IDataReviews} from "../types/reviews";
import {IDataFavorite, IParamFavorite} from '../types/favorite'
import {IBaseQuery, IFiltersQuery} from "../types/query"
import {
    IBodyAuthSession,
    IBodyOutAuthSession,
    IBodyValidateToken,
    IDataAuthSession,
    IDataAuthToken,
    IDataOutAuthSession,
    IDataValidateToken
} from "../types/auth";

import {IDataMakeFavorite, IPropsMakeFavorite} from "../types/makeFavorite";

import {IDataStateMovie, IPropsStateMovie} from '../types/stateMovie'
import {IDataMakeRating, IPropsMakeRating} from '../types/rating'
import {
    IDataAddItemRoster,
    IDataClearRoster,
    IDataListRoster,
    IDataNewRoster,
    IDataRemoveItemRoster,
    IDataRoster,
    IDataRosterBelongMovie,
    IDataStatusRoster,
    IDeleteRoster, IDeleteRosterProps,
    IPropsAddItemRoster,
    IPropsListRoster,
    IPropsNewRoster,
    IPropsRemoveItemRoster,
    IPropsRosterBelongMovie,
    IPropsStatusRoster
} from "../types/roster";

export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    tagTypes: ['movie','roster'],
    endpoints: (build) => ({
        getMovie: build.query<IMovie, number>({
            query: (id) => `movie/${id}?${API_KEY}&${language}`
        }),
        getUpcomingMovie: build.query<IDataUpcoming, number>({
            query: (page) => `movie/upcoming?${API_KEY}&${language}&page=${page}`
        }),
        getVideoMovie: build.query<IDataVideo, number>({
            query: (id) => `movie/${id}/videos?${API_KEY}&${language}`
        }),
        getTheater: build.query<IDataSimilar, number>({
            query: () => `movie/now_playing?${API_KEY}&${language}&page=1`
        }),
        getMovieSimilar: build.query<IDataSimilar, number>({
            query: (id) => `movie/${id}/similar?${API_KEY}&${language}&page=1`
        }),
        getTrendingMovie: build.query({
            query: (time) => `trending/movie/${time}?${API_KEY}`
        }),
        getFilteredMovie: build.query<IDataFilter, IFiltersQuery>({
            query: ({filterProps, page}) => `discover/movie?${API_KEY}&${language}&sort_by=${filterProps.sort}.${filterProps.order}&include_adult=false&include_video=${filterProps.video}&page=${page}&release_date.gte=${filterProps.releaseGte}&release_date.lte=${filterProps.releaseLte}&with_genres=${filterProps.withGenres}`
        }),
        getSearchMovie: build.query<IDataSearch, IBaseQuery>({
            query: ({searchValue, page}) => `search/movie?${API_KEY}&${language}&query=${searchValue}&page=${page}&include_adult=false`
        }),
        getActorsMovie: build.query<IDataActors, number>({
            query: (id) => `movie/${id}/credits?${API_KEY}&${language}`
        }),
        getGenresMovie: build.query<IDataGenres, string>({
            query: () => `genre/movie/list?${API_KEY}&${language}`
        }),
        getReviewsMovie: build.query<IDataReviews, number>({
            query: (id) => `movie/${id}/reviews?${API_KEY}&${language}&page=1`
        }),
        getAuthToken: build.query<IDataAuthToken, string>({
            query: () => `authentication/token/new?${API_KEY}`
        }),
        validateToken: build.mutation<IDataValidateToken, IBodyValidateToken>({
            query: (body) => ({
                url: `authentication/token/validate_with_login?${API_KEY}`,
                method: 'POST',
                body,
            }),
        }),
        getAuthSession: build.mutation<IDataAuthSession, IBodyAuthSession>({
            query: (body) => ({
                url: `authentication/session/new?${API_KEY}`,
                method: 'POST',
                body,
            }),
        }),
        OutAuthSession: build.mutation<IDataOutAuthSession, IBodyOutAuthSession>({
            query: (body) => ({
                url: `authentication/session?${API_KEY}`,
                method: 'DELETE',
                body,
            }),
        }),
        getUser: build.query<any, string | undefined | null>({
            query: (token) => `account?${API_KEY}&session_id=${token}`
        }),
        getFavorite: build.query<IDataFavorite, IParamFavorite>({
            query: ({params}) => `account/${params.id}/favorite/movies?${API_KEY}&${language}&session_id=${params.session_id}&sort_by=${params.sort}&page=${params.page}`,
            providesTags: ['movie'],
        }),
        makeFavorite: build.mutation<IDataMakeFavorite, IPropsMakeFavorite>({
            query: ({body, params}) => ({
                url: `account/${params.id}/favorite?${API_KEY}&session_id=${params.session_id}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['movie'],
        }),
        makeRating: build.mutation<IDataMakeRating, IPropsMakeRating>({
            query: ({body, params}) => ({
                url: `movie/${params.id}/rating?${API_KEY}&session_id=${params.session_id}`,
                method: 'POST',
                body,
            }),

        }),
        getStateMovie: build.query<IDataStateMovie, IPropsStateMovie>({
            query: ({params}) => `movie/${params.movie_id}/account_states?${API_KEY}&session_id=${params.session_id}`,
        }),
        getRoster: build.query<IDataRoster, number>({
            query: (list_id) => `list/${list_id}?${API_KEY}&${language}`,
        }),
        getListRoster: build.query<IDataListRoster, IPropsListRoster>({
            query: ({params}) => `account/${params.account_id}/lists?${API_KEY}&${language}&session_id=${params.session_id}&page=1`,
            providesTags: ['roster'],
        }),
        getStatusRoster: build.query<IDataStatusRoster, IPropsStatusRoster>({
            query: ({params}) => `list/${params.list_id}/item_status?${API_KEY}&movie_id=${params.movie_id}`,

        }),
        getRosterBelongMovie: build.query<IDataRosterBelongMovie, IPropsRosterBelongMovie>({
            query: ({params}) => `movie/${params.movie_id}/lists?${API_KEY}&${language}&page=1`,

        }),

        newRoster: build.mutation<IDataNewRoster, IPropsNewRoster>({
            query: ({body, params}) => ({
                url: `list?${API_KEY}&session_id=${params.session_id}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['roster'],

        }),
        deleteRoster: build.mutation<IDeleteRoster, IDeleteRosterProps>({
            query: ({params}) => ({
                url: `list/${params.list_id}?${API_KEY}&session_id=${params.session_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['roster'],

        }),
        clearRoster: build.mutation<IDataClearRoster, number>({
            query: (list_id) => ({
                url: `list/${list_id}/clear?${API_KEY}`,
                method: 'POST',
            }),

        }),
        addItemRoster: build.mutation<IDataAddItemRoster, IPropsAddItemRoster>({
            query: ({body, params}) => ({
                url: `list/${params.list_id}/add_item?${API_KEY}&session_id=${params.session_id}`,
                method: 'POST',
                body,
            }),

        }),
        removeItemRoster: build.mutation<IDataRemoveItemRoster, IPropsRemoveItemRoster>({
            query: ({body, params}) => ({
                url: `list/${params.list_id}/remove_item?${API_KEY}&session_id=${params.session_id}`,
                method: 'POST',
                body,
            }),

        }),
    })

});


export const {
    useGetMovieQuery,
    useGetMovieSimilarQuery,
    useGetTheaterQuery,
    useGetTrendingMovieQuery,
    useGetFilteredMovieQuery,
    useGetUpcomingMovieQuery,
    useGetVideoMovieQuery,
    useGetActorsMovieQuery,
    useGetSearchMovieQuery,
    useGetGenresMovieQuery,
    useGetReviewsMovieQuery,
    useGetAuthSessionMutation,
    useValidateTokenMutation,
    useLazyGetUserQuery,
    useLazyGetAuthTokenQuery,
    useOutAuthSessionMutation,
    useGetFavoriteQuery,
    useMakeFavoriteMutation,
    useLazyGetStateMovieQuery,
    useMakeRatingMutation,
    useGetListRosterQuery,
    useLazyGetListRosterQuery,
    useAddItemRosterMutation,
    useGetRosterQuery,
    useDeleteRosterMutation,
    useNewRosterMutation

} = movieApi;

