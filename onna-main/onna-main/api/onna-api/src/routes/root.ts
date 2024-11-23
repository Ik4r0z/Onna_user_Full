import { Router } from "express"

import adminRoutes from "./admin"
import artigoRoutes from "./artigo"
import calendarioPersonalizadoRoutes from "./calendarioPersonalizado"
import denunciaRoutes from "./denuncia"
import disponibilidadeRoutes from "./disponibilidade"
import loginRoutes from "./login"
import perfisRoutes from "./perfis"
import postagemRoutes from "./postagem"
import relatorioRoutes from "./relatorio"
import respostaPostagemRoutes from "./respostaPostagem"
import tipoUsuarioRoutes from "./tipoUsuario"

const rootRouter:Router = Router()

rootRouter.use(adminRoutes)
rootRouter.use(artigoRoutes)
rootRouter.use(calendarioPersonalizadoRoutes)
rootRouter.use(denunciaRoutes)
rootRouter.use(disponibilidadeRoutes)
rootRouter.use(loginRoutes)
rootRouter.use(perfisRoutes)
rootRouter.use(postagemRoutes)
rootRouter.use(relatorioRoutes)
rootRouter.use(respostaPostagemRoutes)
rootRouter.use(tipoUsuarioRoutes)

export default rootRouter
