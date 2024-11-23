import { Request, Response } from "express"

import { db } from "../db/connection"

// criar_Notificacao 
export const criar_Notificacao = async (req:Request, res:Response) => {
    const q = "call criar_Notificacao(?, ?, ?, ?, ?)"

    const values = [
        req.body.titulo,
        req.body.mensagem,
        req.body.data_Notificacao,
        req.body.hora,
        req.body.idUsuario
    ]

    db.query(q, [...values], (err) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(values)
    })
}

// exibir_Lista_Notificacoes
export const exibir_Lista_Notificacoes = async (req:Request, res:Response) => {
    const q = "call exibir_Lista_Notificacoes(?)"

    const values = [
        req.params.idUsuario
    ]

    db.query(q, [values], (err, data) => {
        if(err){
            return res.status(500).json(err)
        }
        
        if (data[0].length === 0) {
            return res.status(404).json(err);
        }

        return res.status(200).json(data[0])
    })
}

// excluir_Notificacao
export const excluir_Notificacao = async (req:Request, res:Response) => {
    const q = "call excluir_Notificacao(?)"

    const values = [
        req.body.idNotificacao
    ]

    db.query(q, [values], (err, data) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(data)
    })
}
