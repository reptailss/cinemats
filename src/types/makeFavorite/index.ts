export interface IDataMakeFavorite {
    status_code: 12,
    status_message:string

}

export interface IBodyMakeFavorite {
    media_type: string
    media_id: number
    favorite: boolean
}

export interface IPropsMakeFavorite {
    body: IBodyMakeFavorite,
   params:{
       session_id: string,
       id: number
   }

}