import { Tema } from "./tema.models";

export interface Post {
    id: number;
    titulo: string;
    conteudo: string;
    autor: string;
    temaId: number;
    usuarioId: number;
    criadoEm?: Date;
    tema?: string;
}

export interface PostsPorTema {
    tema: Tema;
    posts: Post[];
  }
  