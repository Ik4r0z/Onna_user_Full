import { Router } from "express"

import { criar_Resposta_Postagem, exibir_Resposta_Postagem, gostei_Resposta, desgostei_Resposta } from "../controllers/respostaPostagem"

const respostaPostagemRoutes:Router = Router()

respostaPostagemRoutes.post("/respostaPostagem", criar_Resposta_Postagem)

respostaPostagemRoutes.get("/respostaPostagem/:idPostagem", exibir_Resposta_Postagem)

respostaPostagemRoutes.put("/respostaPostagemG", gostei_Resposta)
respostaPostagemRoutes.put("/respostaPostagemD", desgostei_Resposta)

export default respostaPostagemRoutes