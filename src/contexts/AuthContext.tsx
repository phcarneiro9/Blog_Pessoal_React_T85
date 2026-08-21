import { createContext, useState, type ReactNode } from "react";
import type UsuarioLogin from "../models/UsuarioLogin";
import axios from "axios";
import { login } from "../services/Service";

// definir os estados e funcoes disponibilizadas pela context
interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogin(usuario: UsuarioLogin): void
    handleLogout(): void
    isLoading: boolean
}

//quem irá consumir a context
interface AuthProviderProps {
    children: ReactNode
}

//Criar o contexto usando a tipagem AuthContextProps
//O contexto irá disponibilizar os estados e as funcoes globalmente 
export const AuthContext = createContext({} as AuthContextProps)

//Iniciar o provedor AuthProvider
//O provedor ira implemnetar as funcoes e inicializar os estados
export function AuthProvider({ children }: AuthProviderProps) {

    //Inicializar o estado usuario, que e o tipo UsuarioLogin
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: '',
    });

    //Inicializar o meu estado chamado isLoading
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //Implementar a funcao handleLogin(autenticar usuario)
    async function handleLogin(usuarioLogin: UsuarioLogin) {


        setIsLoading(true);

        try {
            await login(`usuarios/logar`, usuarioLogin, setUsuario)
            alert("Usuario autenticado com sucesso")
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                alert(`Erro ao autenticar o usuário: ${error.response.status}`);
            } else {
                alert("Erro ao autenticar o usuário! Verifique a conexão com a API!");
            }

        } finally {
            setIsLoading(false);
        }
    }

    //implem,entar a funcao handleLogout (desconectar o usuario)
    function handleLogout() {
        setUsuario(
            {
                id: 0,
                nome: '',
                usuario: '',
                senha: '',
                foto: '',
                token: '',
            }
        )
    }

    return(
        <AuthContext.Provider value={{usuario, handleLogin, handleLogout, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}