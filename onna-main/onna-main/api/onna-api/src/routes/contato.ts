import { Router } from "express"

import { cadastro_Contato, exibir_Lista_Contatos } from "../controllers/contato"

const contatoRoutes:Router = Router() 

contatoRoutes.post("/contato", cadastro_Contato)

contatoRoutes.get("/contato/:idTipo_Usuario", exibir_Lista_Contatos)

export default contatoRoutes