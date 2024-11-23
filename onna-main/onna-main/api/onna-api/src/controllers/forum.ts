import { Request, Response } from "express"

import { db } from "../db/connection"

// criar_Forum
export const criar_Forum = async (req:Request, res:Response) => {
    const q = "call criar_Forum(?, ?)"

    const values = [
        req.body.nome,
        req.body.descricao
    ]

    db.query(q, [...values], (err) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(values)
    })
}

// armazena_idForum
export const armazena_idForum = async (req:Request, res:Response) => {
    const q = "call armazena_idForum(?)"

    const values = [
        req.body.nome
    ]

    db.query(q, [values], (err, data) => {
        if(err){
            return res.status(500).json(err)
        }
        
        if (data[0].length === 0) {
            return res.status(404).json(err);
        }

        const idForum = data[0][0]

        return res.status(200).json(idForum)
    })
}