import {
  useState,
  useContext,
  useEffect,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";

import type Postagem from "../../../models/Postagem";
import type Tema from "../../../models/Temas";

import {
  buscar,
  atualizar,
  cadastrar,
} from "../../../services/Service";

import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormPostagem() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);

  const token = usuario.token;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [temas, setTemas] = useState<Tema[]>([]);

  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: "",
  });

  const [postagem, setPostagem] = useState<Postagem>({
    id: 0,
    titulo: "",
    texto: "",
    data: "",
    tema: {
      id: 0,
      descricao: "",
    },
    usuario: usuario,
  });

  // =========================================
  // BUSCAR POSTAGEM POR ID
  // =========================================

  async function buscarPostagemPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      console.log("Erro ao buscar postagem:", error);

      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  // =========================================
  // BUSCAR TEMA POR ID
  // =========================================

  async function buscarTemaPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      console.log("Erro ao buscar tema:", error);

      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  // =========================================
  // BUSCAR TODOS OS TEMAS
  // =========================================

  async function buscarTemas() {
    try {
      await buscar("/temas", setTemas, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      console.log("Erro ao buscar temas:", error);

      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  // =========================================
  // VERIFICAR LOGIN
  // =========================================

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "info");

      navigate("/");
    }
  }, [token, navigate]);

  // =========================================
  // CARREGAR TEMAS E POSTAGEM
  // =========================================

  useEffect(() => {
    buscarTemas();

    if (id !== undefined) {
      buscarPostagemPorId(id);
    }
  }, [id]);

  // =========================================
  // CARREGAR TEMA DA POSTAGEM AO EDITAR
  // =========================================

  useEffect(() => {
    if (
      id !== undefined &&
      postagem.tema &&
      tema.id === 0
    ) {
      setTema(postagem.tema);
    }
  }, [postagem.tema, id, tema.id]);

  // =========================================
  // ATUALIZAR INPUTS
  // =========================================

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement>
  ) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
    });
  }

  // =========================================
  // RETORNAR PARA LISTA
  // =========================================

  function retornar() {
    navigate("/postagens");
  }

  // =========================================
  // CADASTRAR / ATUALIZAR POSTAGEM
  // =========================================

  async function gerarNovaPostagem(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    // Verifica se um tema foi selecionado
    if (tema.id === 0) {
      ToastAlerta(
        "Selecione um tema para a postagem",
        "info"
      );

      return;
    }

    setIsLoading(true);

    // Garante que o objeto enviado para a API
    // tenha o tema e o usuário
    const postagemParaEnviar: Postagem = {
      ...postagem,
      tema: tema,
      usuario: usuario,
    };

    try {
      // =====================================
      // ATUALIZAR
      // =====================================

      if (id !== undefined) {
        await atualizar(
          "/postagens",
          postagemParaEnviar,
          setPostagem,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        ToastAlerta(
          "Postagem atualizada com sucesso",
          "sucesso"
        );
      }

      // =====================================
      // CADASTRAR
      // =====================================

      else {
        await cadastrar(
          "/postagens",
          postagemParaEnviar,
          setPostagem,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        ToastAlerta(
          "Postagem cadastrada com sucesso",
          "sucesso"
        );
      }

      // Só retorna se a API realmente
      // finalizar a requisição com sucesso
      retornar();

    } catch (error: any) {
      console.error(
        "Erro ao salvar postagem:",
        error
      );

      // Mostra no console exatamente
      // o que o backend respondeu
      if (error.response) {
        console.error(
          "Status HTTP:",
          error.response.status
        );

        console.error(
          "Resposta da API:",
          error.response.data
        );
      }

      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        ToastAlerta(
          id !== undefined
            ? "Erro ao atualizar a Postagem"
            : "Erro ao cadastrar a Postagem",
          "erro"
        );
      }

    } finally {
      setIsLoading(false);
    }
  }

  // =========================================
  // JSX
  // =========================================

  return (
    <div className="container flex flex-col mx-auto my-5 items-center justify-center bg-coffee-300 w-full rounded-2xl border-2 border-amber-950 py-5 px-5">

      <h1 className="text-4xl text-center my-8">
        {id !== undefined
          ? "Editar Postagem"
          : "Cadastrar Postagem"}
      </h1>

      <form
        className="flex flex-col w-1/2 gap-4 font-semibold"
        onSubmit={gerarNovaPostagem}
      >

        {/* TÍTULO */}

        <div className="flex flex-col gap-2">

          <label htmlFor="titulo">
            Titulo da Postagem
          </label>

          <input
            type="text"
            id="titulo"
            placeholder="Titulo"
            name="titulo"
            required
            minLength={5}
            maxLength={100}
            className="border-2 border-coffee-700 rounded p-2"
            value={postagem.titulo || ""}
            onChange={atualizarEstado}
          />

        </div>

        {/* TEXTO */}

        <div className="flex flex-col gap-2">

          <label htmlFor="texto">
            Texto da Postagem
          </label>

          <input
            type="text"
            id="texto"
            placeholder="Texto"
            name="texto"
            required
            minLength={10}
            maxLength={1000}
            className="border-2 border-coffee-700 rounded p-2"
            value={postagem.texto || ""}
            onChange={atualizarEstado}
          />

        </div>

        {/* TEMA */}

        <div className="flex flex-col gap-2">

          <label htmlFor="tema">
            Tema da Postagem
          </label>

          <select
            name="tema"
            id="tema"
            required
            className="border p-2 border-coffee-800 rounded"
            value={tema.id}
            onChange={(e) =>
              buscarTemaPorId(
                e.currentTarget.value
              )
            }
          >

            <option
              value={0}
              disabled
            >
              Selecione um Tema
            </option>

            {temas.map((tema) => (
              <option
                key={tema.id}
                value={tema.id}
              >
                {tema.descricao}
              </option>
            ))}

          </select>

        </div>

        {/* BOTÃO */}

        <button
          type="submit"
          className="rounded disabled:bg-coffee-100 bg-coffee-800 hover:bg-cyan-600 text-white font-bold w-full mx-auto py-2 flex justify-center"
          disabled={
            isLoading ||
            tema.id === 0
          }
        >

          {isLoading ? (
            <ClipLoader
              color="#ffffff"
              size={24}
            />
          ) : (
            <span>
              {id === undefined
                ? "Cadastrar"
                : "Atualizar"}
            </span>
          )}

        </button>

      </form>

    </div>
  );
}

export default FormPostagem;