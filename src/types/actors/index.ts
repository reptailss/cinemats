export interface IDataActors {
    cast: [],
    crew: IActor[],
    id: number
}

export interface IActor {
    adult?: boolean,
    cast_id?: number,
    character: string,
    credit_id?: string,
    gender?: 2,
    id: number,
    known_for_department?: string,
    name: string,
    order?: number,
    original_name?: string,
    popularity?: number,
    profile_path: string,
}