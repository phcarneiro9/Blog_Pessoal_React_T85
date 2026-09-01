import { Link } from 'react-router-dom'
import type Tema from '../../../models/Temas'


interface CardTemaProps{
        tema: Tema;
    }
function CardTema({tema}: CardTemaProps) {

    
    return (
        <div className='flex flex-col border-3 font-bold border-coffee-300 rounded-md overflow-hidden justify-between'>
            <header className='py-2 px-6 bg-coffee-800  text-white font-bold text-2xl'>Tema</header>
            <p className='p-8 text-3xl bg-coffee-100 h-full'>{tema.descricao}</p>

            <div className='flex'>
                <Link to={`/editartema/${tema.id}`}className='w-full  bg-coffee-800 text-white bg-cia
    hover:bg-cyan-800 flex items-center justify-center p-2'>
                    <button>Editar</button>
                </Link>

                <Link to={`/deletartema/${tema.id}`} className=' bg-red-500 hover:bg-red-900 text-white w-full flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>

        </div>
    )
}

export default CardTema