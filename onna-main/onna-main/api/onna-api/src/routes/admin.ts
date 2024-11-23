import { Router } from "express"

import { cadastro_Admin } from "../controllers/admin"

const adminRoutes:Router = Router()  

adminRoutes.post("/admin", cadastro_Admin)

export default adminRoutes