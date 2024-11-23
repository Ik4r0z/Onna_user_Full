import { Request, Response } from "express"

import { db } from "../db/connection"

// salvar_Contato_1 
export const salvar_Contato_1 = async (req:Request, res:Response) => {
    const q = "call salvar_Contato_1(?, ?)"

    const values = [
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

// salvar_Contato_2
export const salvar_Contato_2 = async (req:Request, res:Response) => {
    const q = "call salvar_Contato_2(?, ?)"

    const values = [
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

// excluir_Contato_1
export const excluir_Contato_1 = async (req:Request, res:Response) => {
    const q = "call excluir_Contato_1(?, ?)"

    const values = [
        req.body.idTipo_Usuario,
        req.body.idContato
    ]

    db.query(q, [...values], (err, data) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(data)
    })
}

// excluir_Contato_2
export const excluir_Contato_2 = async (req:Request, res:Response) => {
    const q = "call excluir_Contato_2(?, ?)"

    const values = [
        req.body.idTipo_Usuario,
        req.body.idContato
    ]

    db.query(q, [...values], (err, data) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(data)
    })
}