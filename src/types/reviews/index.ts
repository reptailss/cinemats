export interface IDataReviews {
    id: number
    page: number
    results: IReview[],
    total_pages: number
    total_results: number
}
export interface IReview {
    author?: string
    author_details?: IAutorDetaiils
    content?: string,
    created_at?: string,
    id?: string,
    updated_at?: string,
    url?: string
}
export interface IAutorDetaiils {
    avatar_path?: string,
    name?: string,
    rating?: number
    username?: string,
}