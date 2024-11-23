import { Router } from "express"

import { criar_Relatorio_Humor, exibir_Relatorio} from "../controllers/relatorioHumor"

const relatorioHumorRoutes:Router = Router()  

relatorioHumorRoutes.post("/relatorioHumor", criar_Relatorio_Humor)

relatorioHumorRoutes.get("/relatorioHumor/:idUsuario/:data_Relatorio", exibir_Relatorio)

export default relatorioHumorRoutes
