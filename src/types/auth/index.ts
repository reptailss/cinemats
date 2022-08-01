export interface IDataAuthToken {
    success: boolean
    expires_at: string
    request_token: string,
}

export interface IBodyValidateToken {
    request_token: string,
    password: string,
    username: string
}

export interface IDataValidateToken {
    success: boolean
    expires_at: string
    request_token: string

}


export interface IBodyAuthSession {
    request_token: string

}

export interface IDataAuthSession {
    success: boolean,
    session_id: string
}

export interface IDataOutAuthSession {
    success: boolean
}

export interface IBodyOutAuthSession {
    session_id: string
}


