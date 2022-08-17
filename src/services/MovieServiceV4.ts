import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {API_KEY_V4, API_URL_V4,API_KEY, language} from "../constans/api"
import {IDataAddMultiItemsRosterV4, IPropsAddMultiItemsRosterV4} from "../types/roster";



export const movieApiV4 = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({baseUrl: API_URL_V4}),
    tagTypes: ['movie','roster'],
    endpoints: (build) => ({
        addMultiItemsRoster: build.mutation<IDataAddMultiItemsRosterV4, IPropsAddMultiItemsRosterV4>({
            query: ({body, params}) => ({
                url: `list/${params.list_id}/items?${API_KEY_V4}&session_id=${params.session_id}`,
                headers: { Authorization: `Bearer ${params.session_id}` },
                method: 'POST',
                body,
            }),

        }),

    })

});


export const {
   useAddMultiItemsRosterMutation

} = movieApiV4;

