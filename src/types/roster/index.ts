import {IMovie} from "../movie";


export interface IDataRoster {
    created_by: string,
    description: string,
    favorite_count: number,
    id: string,
    items: IMovie[],
    item_count: number,
    iso_639_1: string,
    name: string,
    poster_path: string
}

export interface IDataStatusRoster {
    id: string,
    item_present: boolean
}

export interface IPropsStatusRoster {
    params: {
        movie_id: number,
        list_id: number
    }
}

export interface IDataNewRoster {
    status_message: string,
    success: boolean,
    status_code: number,
    list_id: number,
}

export interface IBodyNewRoster {
    name: string,
    description: string,
    language: string,
}

export interface IPropsNewRoster {
    body: IBodyNewRoster,
    params: {
        session_id: string | null
    }

}

export interface IDeleteRoster {
    status_code: number,
    status_message: string
}

export interface IDeleteRosterProps {
    params: {
        list_id: number,
        session_id: string | null,
    }
}

export interface IDataClearRoster {
    status_code: number,
    status_message: string
}

export interface IDataAddItemRoster {
    status_code: number,
    status_message: string
}

export interface IBodyAddItemRoster {
    media_id: number
}

export interface IPropsAddItemRoster {
    body: IBodyAddItemRoster,
    params: {
        session_id: string,
        list_id: number
    }
}

export interface IDataRemoveItemRoster {
    status_code: number,
    status_message: string
}

export interface IBodyRemoveItemRoster {
    media_id: number
}

export interface IPropsRemoveItemRoster {
    body: IBodyRemoveItemRoster,
    params: {
        session_id: string,
        list_id: number
    }
}

export interface IDataRosterBelongMovie {
    id: number,
    page: number,
    results: IRoster[]
}


export interface IRoster {
    description: string,
    favorite_count: number
    id: number
    item_count: number
    iso_639_1: string,
    list_type: string,
    name: string,
    poster_path: string | null

}

export interface IPropsRosterBelongMovie  {
    params: {
        movie_id: number,
        page: number
    }
}

export interface IDataListRoster {
    page: number,
    results: IRoster[]
}

export interface IPropsListRoster {
    params: {
        session_id: string | null,
        page?: number,
        account_id: number
    }
}