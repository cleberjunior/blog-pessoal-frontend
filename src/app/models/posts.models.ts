export interface Post {
    id: number;
    titulo: string;
    conteudo: string;
    autor: string;
    criadoEm?: Date;
    temaId: number;
    usuarioId: number;
}
