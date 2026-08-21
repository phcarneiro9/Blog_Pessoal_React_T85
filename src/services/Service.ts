import axios from "axios";

const api = axios.create({
    baseURL: 'https://blogpessoal-spring-71j2.onrender.com'
})

//funcao cadastrar usuario
export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados); setDados(resposta.data)
}

//funcao autenticar usuario
export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados); setDados(resposta.data)
}

//funcao de consulta com token
export const buscar = async (url: string, setDados: Function, header: Object) => {
    const resposta = await api.get(url, header);
    setDados(resposta.data);
}

//funcao cadastrar com token
export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.post(url, dados, header); setDados(resposta.data);
}

//funcao atualizar com token
export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put(url, dados, header); setDados(resposta.data);
}

//funcao Deletar com token
export const deletar = async (url: string, header: Object) => {
    await api.delete(url, header);
    
}