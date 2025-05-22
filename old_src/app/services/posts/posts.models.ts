export interface SavePostRequest {
    name: string
    email: string
    phone: string
}

export interface UpdatePostRequest {
    name: string
    email: string
    phone: string
}

export interface SavePostResponse {
    id: number
    name: string
    email: string
    phone: string
}

export interface UpdatePostResponse {
    id: number
    name: string
    email: string
    phone: string
}

export interface ListPostResponse {
    id: number
    name: string
    email: string
    phone: string
}

export interface DetailPostResponse {
    id: number
    name: string
    email: string
    phone: string
}
