import {IGenre} from "../genres";

export interface IMovie {
    title?: string,
    original_title: string,
    name?: string,
    status?: string,
    poster_path: string,
    backdrop_path: string,
    vote_average: number,
    id: number,
    overview: string,
    release_date?: string,
    budget?: string,
    spoken_languages?: string,
    original_language?: string,
    genres: IGenre[]
    minHeightImg?: number

}


export interface IDataMovie {
    page: number,
    results: IMovie[],
    total_pages: number,
    total_results: number,
    dates? : {}
}