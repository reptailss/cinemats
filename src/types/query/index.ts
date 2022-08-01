export interface IFiltersProps {
    sort: string,
    order: string,
    releaseGte: string,
    releaseLte: string,
    video: string,
    withGenres: string
}


export interface IBaseQuery {
    page?: number,
    id?: number,
    searchValue?: string,
}

export interface IFiltersQuery extends IBaseQuery{
    filterProps: IFiltersProps,
}
