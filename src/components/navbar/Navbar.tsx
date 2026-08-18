import { Link } from "react-router-dom"

function Navbar() {
    return (
        <>
            <div className="flex justify-center bg-indigo-900 py-4 w-full bg-amber-700 text-white">

                <div className="container flex justify-between text-lg mx-8" >
                    <Link to="/" className="text-2xl font-bold">Blog Pessoal</Link>

                    <div className="flex gap-4">
                        Postagens
                        Temas
                        Cadastrar tema
                        Perfil
                       <Link to="/login" className="hover:underline"> Sair</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar