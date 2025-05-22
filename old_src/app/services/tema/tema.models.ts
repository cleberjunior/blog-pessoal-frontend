export interface SaveTemaRequest {
    descricao: string
}

export interface UpdateTemaRequest {
    name: string
    descricao: string
}

export interface SaveTemaResponse {
    id: number
    descricao: string
}

export interface UpdateTemaResponse {
    id: number
    descricao: string
}

export interface ListTemaResponse {
    id: number
    descricao: string
}

export interface DetailTemaResponse {
    id: number
    descricao: string
}
