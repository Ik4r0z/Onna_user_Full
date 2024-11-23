import { Router } from "express"

import { enviar_Mensagem, exibir_Mensagens } from "../controllers/conversaPrivada"

const conversaPrivadaRoutes:Router = Router()  

conversaPrivadaRoutes.post("/conversaPrivada", enviar_Mensagem)

conversaPrivadaRoutes.get("/conversaPrivada/:idTipo_Usuario/:idContato", exibir_Mensagens)

export default conversaPrivadaRoutes