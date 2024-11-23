import express, { Express } from "express"

import cors from "cors"

import { PORT } from "./secrets"

import rootRouter from "./routes/root"

const app:Express = express()

app.use(express.json())
app.use(cors())
app.use("/api", rootRouter)

app.listen(PORT, () => {
    console.log("API working!")
})