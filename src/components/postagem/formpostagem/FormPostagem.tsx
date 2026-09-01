import { useState, useContext, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import type Tema from "../../../models/Temas";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormPostagem() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [temas, setTemas] = useState<Tema[]>([])

  const [tema, setTema] = useState<Tema>({ id: 0, descricao: '', })
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

  const { id } = useParams<{ id: string }>()

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  async function buscarPostagemPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      }
    }
  }

  async function buscarTemaPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      }
    }
  }

  async function buscarTemas() {
    try {
      await buscar('/temas', setTemas, {
        headers: { Authorization: token }
      })
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', 'info');
      navigate('/');
    }
  }, [token])

  useEffect(() => {
    buscarTemas()

    if (id !== undefined) {
      buscarPostagemPorId(id)
    }
  }, [id])

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
    })
  }, [tema])

  useEffect(() => {
    if (id !== undefined && postagem.tema && tema.id === 0) {
      setTema(postagem.tema)
    }
  }, [postagem.tema])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuario,
    });
  }

  function retornar() {
    navigate('/postagens');
  }

  async function gerarNovaPostagem(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    if (id !== undefined) {
      try {
        await atualizar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta('Postagem atualizada com sucesso', 'sucesso')

      } catch (error: any) {
        if (error.toString().includes('401')) {
          handleLogout()
        } else {
          ToastAlerta('Erro ao atualizar a Postagem', 'erro')
        }
      }

    } else {
      try {
        await cadastrar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        })

        ToastAlerta('Postagem cadastrada com sucesso', 'sucesso');

      } catch (error: any) {
        if (error.toString().includes('401')) {
          handleLogout()
        } else {
          ToastAlerta('Erro ao cadastrar a Postagem', 'erro');
        }
      }
    }

    setIsLoading(false)
    retornar()
  }

  const carregandoTema = tema.descricao === '';
  return (
      <div className="container flex flex-col mx-auto my-5  items-center justify-center bg-coffee-300 w-full rounded-2xl border-2 border-amber-950 py-5 px-5">
        <h1 className="text-4xl text-center my-8">
          {id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}
        </h1>
      

        <form className="flex flex-col w-1/2 gap-4 font-semibold"
          onSubmit={gerarNovaPostagem}>
          <div className="flex  flex-col gap-2">
            <label htmlFor="titulo">Titulo da Postagem</label>
            <input
              type="text"
              placeholder="Titulo"
              name="titulo"
              required
              className="border-2 border-coffee-700 rounded p-2"
              value={postagem.titulo}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="titulo">Texto da Postagem</label>
            <input
              type="text"
              placeholder="Texto"
              name="texto"
              required
              className="border-2 border-coffee-700 rounded p-2"
              value={postagem.texto}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Tema da Postagem</p>
            <select
              name="tema"
              id="tema"
              className='border p-2 border-coffee-800 rounded'
              value={tema.id}
              onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
            >
              <option value="" selected disabled>Selecione um Tema</option>

              {temas.map((tema) => (
                <>
                  <option value={tema.id}>{tema.descricao}</option>
                </>
              ))}
            </select>
          </div>
          <button
            type='submit'
            className='rounded disabled:bg-coffee-100 bg-coffee-800 hover:bg-cyan-600
        text-white font-bold w-full mx-auto py-2 flex justify-center'
            disabled={carregandoTema}
          >
            {isLoading ?
              <ClipLoader
                color="#ffffff"
                size={24}
              /> :
              <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
            }
          </button>
        </form>
      </div>
  );
}

export default FormPostagem;