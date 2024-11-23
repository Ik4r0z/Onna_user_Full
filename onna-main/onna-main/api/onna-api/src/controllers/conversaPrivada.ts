import { Request, Response } from "express"

import { db } from "../db/connection"

// enviar_Mensagem 
export const enviar_Mensagem = async (req:Request, res:Response) => {
    const q = "call enviar_Mensagem(?, ?, ?)"

    const values = [
        req.body.mensagem,
        req.body.idTipo_Usuario,
        req.body.idContato
    ]

    db.query(q, [...values], (err) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(values)
    })
}

// exibir_Mensagens
export const exibir_Mensagens = async (req:Request, res:Response) => {
    const q = "call exibir_Mensagens(?, ?)"

    const values = [
        req.params.idTipo_Usuario,
        req.params.idContato
    ]

    db.query(q, [...values], (err, data) => {
        if(err){
            return res.status(500).json(err)
        }
        
        if (data[0].length === 0) {
            return res.status(404).json(err);
        }

        return res.status(200).json(data[0])
    })
}