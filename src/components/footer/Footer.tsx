import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import { useContext, type ReactNode } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

function Footer() {

  let data = new Date().getFullYear()

  const { usuario } = useContext(AuthContext);

  const token = usuario.token

  let component: ReactNode

  if (token !== '') {
    component = (<>
      <div className="flex justify-center bg-coffee-900 text-white">
        <div className="container flex flex-col items-center py-4">
          <p className="text-xl font-bold">
            Blog Yan Ferreira | Copyright: {data}
          </p>
          <p className="text-lg">Acesse minhas redes sociais</p>
          <div className="flex gap-2">
            <Link to='https://www.linkedin.com/in/phcarneiro9/' className="hover:text-coffee-300">
              <LinkedinLogoIcon size={48} weight='bold' /></Link>
            <Link to='https://github.com/phcarneiro9'className="hover:text-coffee-300">
              <GithubLogoIcon size={48} weight='bold' /></Link>
            <Link to='https://www.instagram.com/ph.carneiro_/' className="hover:text-coffee-300">
              <InstagramLogoIcon size={48} weight='bold'/></Link>
          </div>
        </div>
      </div>

    </>)
  }


  return (
    <>
      {component}
    </>
  )
}

export default Footer