import { Router } from "express"

import { cadastrar_Calendario, alterar_Calendario, definir_Intervalo_Calendario } from "../controllers/calendarioPersonalizado"

const calendarioPersonalizadoRoutes:Router = Router()  

calendarioPersonalizadoRoutes.post("/calendarioPersonalizado", cadastrar_Calendario)

calendarioPersonalizadoRoutes.get("/calendarioPersonalizado/:idUsuario", definir_Intervalo_Calendario)

calendarioPersonalizadoRoutes.put("/calendarioPersonalizado", alterar_Calendario)

export default calendarioPersonalizadoRoutes