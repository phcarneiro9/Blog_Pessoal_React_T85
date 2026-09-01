import { useContext, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { DoorOpenIcon } from "@phosphor-icons/react";

function Navbar() {
    const navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext);

    const token = usuario.token

    function logout() {
        handleLogout();
        navigate("/");
    }

    //reactnode é todo e qualquer component react arquivos tsx que podem ser renderizados no computador
    let component: ReactNode

    if (token !== ''){
        component = (
            <>
                <div className='w-full border-b-2 border-b-coffee-300 flex justify-center py-4
                            bg-coffee-900 text-white'>

                    <div className="container flex justify-between text-lg mx-8">
                        <Link to="/" className="text-2xl font-bold">Blog Pessoal </Link>

                        <div className='flex gap-4'>
                            <Link to='/postagens' className="font-bold hover:underline hover:text-coffee-300">Postagens</Link>
                            <Link to='/temas' className="font-bold hover:underline hover:text-coffee-300">Temas</Link>
                            <Link to='/cadastrartema' className="font-bold hover:underline hover:text-coffee-300">Cadastrar tema</Link>
                            <Link to='/perfil' className="font-bold hover:underline hover:text-coffee-300"> Perfil</Link>
                            <Link onClick={logout} to="" className="flex gap-2 font-bold hover:underline hover:text-coffee-300"> Sair <DoorOpenIcon/></Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
       <>
       {component}
       </>
    )
}

export default Navbar