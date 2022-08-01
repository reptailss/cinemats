import {IMovie} from "../movie";

export interface IDataFilter {
    page: number,
    results: IMovie[],
    total_pages: number,
    total_results: number,
}
