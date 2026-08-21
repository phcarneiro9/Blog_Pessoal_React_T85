import type Postagem from "./Postagem";

export default interface Usuario{
id: number;
nome: string;
senha: string;
foto: string;
usuario: string;
postagem?: Postagem[] | null;
}