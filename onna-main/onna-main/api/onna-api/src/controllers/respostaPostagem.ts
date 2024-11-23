import { Request, Response } from "express"

import { db } from "../db/connection"

// criar_Resposta_Postagem
export const criar_Resposta_Postagem = async (req:Request, res:Response) => {
    const q = "call criar_Resposta_Postagem(?, ?, ?)"

    const values = [
        req.body.mensagem,
        req.body.idTipo_Usuario,
        req.body.idPostagem
    ]

    db.query(q, [...values], (err) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(values)
    })
}

// exibir_Resposta_Postagem
export const exibir_Resposta_Postagem = async (req:Request, res:Response) => {
    const q = "call exibir_Resposta_Postagem(?)"

    const values = [
        req.params.idPostagem
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

// gostei_Resposta
export const gostei_Resposta = async (req:Request, res:Response) => {
    const q = "call gostei_Resposta(?)"

    const values = [
        req.body.idResposta_Postagem
    ]

    db.query(q, [values], (err) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(values)
    })
}

// desgostei_Resposta
export const desgostei_Resposta = async (req:Request, res:Response) => {
    const q = "call desgostei_Resposta(?)"

    const values = [
        req.body.idResposta_Postagem
    ]

    db.query(q, [values], (err) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(values)
    })
}