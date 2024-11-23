import { Router } from "express"

import { criar_Disponibilidade, exibir_Disponibilidade, exibir_Pro_Disponivel, alterar_Disponibilidade, excluir_Disponibilidade } from "../controllers/disponibilidade"

const disponibilidadeRoutes:Router = Router()  

disponibilidadeRoutes.post("/disponibilidade", criar_Disponibilidade)

disponibilidadeRoutes.get("/disponibilidade/:idProfissional", exibir_Disponibilidade)
disponibilidadeRoutes.get("/disponibilidadePD/:data_Atual", exibir_Pro_Disponivel)

disponibilidadeRoutes.put("/disponibilidade", alterar_Disponibilidade)

disponibilidadeRoutes.delete("/disponibilidade", excluir_Disponibilidade)

export default disponibilidadeRoutes
