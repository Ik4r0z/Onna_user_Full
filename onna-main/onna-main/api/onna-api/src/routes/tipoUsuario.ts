import { Router } from "express"

import { cadastro_Tipo_Usuario, modificar_Avatar,  modificar_Senha} from "../controllers/tipoUsuario"

const tipoUsuarioRoutes:Router = Router()  

tipoUsuarioRoutes.post("/tipoUsuario", cadastro_Tipo_Usuario) 

tipoUsuarioRoutes.put("/tipoUsuarioA", modificar_Avatar)
tipoUsuarioRoutes.put("/tipoUsuarioS", modificar_Senha)

export default tipoUsuarioRoutes
