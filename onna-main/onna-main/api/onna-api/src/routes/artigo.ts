import { Router } from "express"

import { exibir_Artigo_Genero, artigo_Selecionado, consulta_Titulo_Artigo, exibir_Artigos } from "../controllers/artigo"

const artigoRoutes:Router = Router()

artigoRoutes.get("/artigoG/:idGenero", exibir_Artigo_Genero)
artigoRoutes.get("/artigoS/:idArtigo", artigo_Selecionado)
artigoRoutes.get("/artigoT/:titulo", consulta_Titulo_Artigo)
artigoRoutes.get("/artigo", exibir_Artigos)

export default artigoRoutes
