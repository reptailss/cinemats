import {IMovie} from "../movie";

export interface IDataSearch {
    page: number,
    results: IMovie[],
    total_pages: number,
    total_results: number,
}
