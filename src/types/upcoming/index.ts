import {IMovie} from "../movie";

export interface IDataUpcoming {
    page: number,
    results: IMovie[],
    total_pages: number,
    total_results: number,
    dates? : {

    }
}