import { Router } from "express"

import { criar_Postagem, exibir_Postagem_Especifica, exibir_Postagem_Popular, exibir_Postagem_Forum, consulta_Titulo_Postagem, exibir_Postagem_Geral, exibir_Postagem_Propria, contagem_Postagem, alterar_Postagem, excluir_Postagem, gostei_Postagem, desgostei_Postagem } from "../controllers/postagem"

const postagemRoutes:Router = Router()

postagemRoutes.post("/postagem", criar_Postagem)

postagemRoutes.get("/postagemE/:idPostagem", exibir_Postagem_Especifica)
postagemRoutes.get("/postagemPOP", exibir_Postagem_Popular)
postagemRoutes.get("/postagemF/:idForum", exibir_Postagem_Forum)
postagemRoutes.get("/postagemT/:titulo/:idForum", consulta_Titulo_Postagem)
postagemRoutes.get("/postagemG", exibir_Postagem_Geral)
postagemRoutes.get("/postagemP/:idTipo_Usuario", exibir_Postagem_Propria)
postagemRoutes.get("/postagemC/:idTipo_Usuario", contagem_Postagem)

postagemRoutes.put("/postagemA", alterar_Postagem)
postagemRoutes.put("/postagemE", excluir_Postagem)
postagemRoutes.put("/postagemG", gostei_Postagem)
postagemRoutes.put("/postagemD", desgostei_Postagem)

export default postagemRoutes
