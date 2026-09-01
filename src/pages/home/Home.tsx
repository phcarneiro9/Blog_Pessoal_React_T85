import ListaPostagens from "../../components/postagem/listapostagens/ListaPostagens"
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem"

function Home() {

  return (
    <>
      <div className="flex bg-coffee-900 justify-center">

        <div className="container grid grid-cols-1 md:grid-cols-2 text-coffee-300">

          {/* conteudo de texto*/}
          <div className="flex flex-col gap-4 items-center justify-center py-4" >
            <h2 className="text-5xl font-bold">Seja Bem-Vinde !</h2>

            <p className="text-xl">Expresse aqui seus pensamentos</p>

            <div className="flex justify-around gap-4">
              <ModalPostagem />

            </div>
          </div>


          {/* Imagem da pagina home*/}
          <div className="flex justify-center">
            <img
              src="https://ik.imagekit.io/eosfuraqd/Developer%20activity-bro.svg"
              alt="Imagem da pagina home"
              className="w-2/3" />
          </div>

        </div>

      </div>
      <ListaPostagens />
    </>
  )
}

export default Home