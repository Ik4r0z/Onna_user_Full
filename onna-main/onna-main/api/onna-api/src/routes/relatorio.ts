import { Router } from "express"

import { criar_Relatorio_Humor, criar_Relatorio_Remedio, criar_Relatorio_Atividade, exibir_Relatorio_Humor, exibir_Relatorio_Remedio, exibir_Relatorio_Atividade} from "../controllers/relatorio"

const relatorioRoutes:Router = Router()  

relatorioRoutes.post("/relatorioH", criar_Relatorio_Humor)
relatorioRoutes.post("/relatorioR", criar_Relatorio_Remedio)
relatorioRoutes.post("/relatorioA", criar_Relatorio_Atividade)

relatorioRoutes.get("/relatorioH/:idUsuario/:data_Relatorio", exibir_Relatorio_Humor)
relatorioRoutes.get("/relatorioR/:idUsuario/:data_Relatorio", exibir_Relatorio_Remedio)
relatorioRoutes.get("/relatorioA/:idUsuario/:data_Relatorio", exibir_Relatorio_Atividade)

export default relatorioRoutes
