export interface IDataStateMovie {
    id: number,
    favorite: boolean,
    rated: {
        value: number
    },
    watchlist: boolean
}

export interface IPropsStateMovie {
   params: {
       movie_id: number,
       session_id: string | null,
       guest_session_id?: string
   }
}