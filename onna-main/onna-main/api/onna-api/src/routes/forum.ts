import { Router } from "express"

import { criar_Forum, armazena_idForum } from "../controllers/forum"

const forumRoutes:Router = Router()

forumRoutes.post("/forum", criar_Forum)

forumRoutes.get("/forum", armazena_idForum)

export default forumRoutes