

export interface IDataMakeRating {

    status_code: number,
    status_message: string

}

export interface IBodyMakeRating {
    value: number | null
}


export interface IPropsMakeRating {
    body: IBodyMakeRating,
    params:{
        session_id: string,
        id: number
    }

}