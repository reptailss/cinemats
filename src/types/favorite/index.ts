import {IMovie} from "../movie";

export interface IDataFavorite {
    page: number,
    results: IMovie[],
    total_pages: number,
    total_results: number,
}

export interface IParamsFavorite {
    session_id: string,
    id: number,
    sort_by?: string,
    page?: number
}

export interface IParamFavorite {
    params: {
        session_id: string | null,
        id: number,
        page?: number,
        sort: string
    }
}