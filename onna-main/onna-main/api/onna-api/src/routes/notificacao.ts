import { Router } from "express"

import { criar_Notificacao, exibir_Lista_Notificacoes, excluir_Notificacao } from "../controllers/notificacao"

const notificacaoRoutes:Router = Router()  

notificacaoRoutes.post("/notificacao", criar_Notificacao)

notificacaoRoutes.get("/notificacao/:idUsuario", exibir_Lista_Notificacoes)

notificacaoRoutes.delete("/notificacao", excluir_Notificacao)

export default notificacaoRoutes
