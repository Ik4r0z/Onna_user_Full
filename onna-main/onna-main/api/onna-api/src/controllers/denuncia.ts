import { Request, Response } from "express"

import { db } from "../db/connection"

// criar_Denuncia
export const criar_Denuncia = async (req:Request, res:Response) => {
    const q = "call criar_Denuncia(?, ?, ?, ?, ?)"

    const values = [
        req.body.descricao,
        req.body.idTipo_Usuario,
        req.body.idPostagem,
        req.body.idResposta_Postagem,
        req.body.idTipo_Denuncia
    ]

    db.query(q, [...values], (err) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(values)
    })
}
