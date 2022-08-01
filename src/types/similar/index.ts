import {IMovie} from "../movie";

export interface IDataSimilar {
    page: number
    results: IMovie[],
    total_pages: number
    total_results: number
}