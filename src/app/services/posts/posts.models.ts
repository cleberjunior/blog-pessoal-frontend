export interface SavePostRequest {
    titulo: string
    conteudo: string
    autor: string
}

export interface UpdatePostRequest {
    titulo: string
    conteudo: string
    autor: string
}

export interface SavePostResponse {
    id: number
    titulo: string
    conteudo: string
    autor: string
}

export interface UpdatePostResponse {
    id: number
    titulo: string
    conteudo: string
    autor: string
}

export interface ListPostResponse {
    id: number
    titulo: string
    conteudo: string
    autor: string
}

export interface DetailPostResponse {
    id: number
    titulo: string
    conteudo: string
    autor: string
}
