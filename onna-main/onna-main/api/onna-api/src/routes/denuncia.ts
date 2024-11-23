import { Router } from "express"

import { criar_Denuncia } from "../controllers/denuncia"

const denunciaRoutes:Router = Router()

denunciaRoutes.post("/denuncia", criar_Denuncia)

export default denunciaRoutes
