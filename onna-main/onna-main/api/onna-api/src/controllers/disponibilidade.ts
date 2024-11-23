import { Request, Response } from "express"

import { db } from "../db/connection"

// criar_Disponibilidade 
export const criar_Disponibilidade = async (req:Request, res:Response) => {
    const q = "call criar_Disponibilidade(?, ?, ?, ?)"

    const values = [
        req.body.idProfissional,
        req.body.data_Disponibilidade,
        req.body.hora_Inicial,
        req.body.hora_Final
    ]

    db.query(q, [...values], (err) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(values)
    })
}

// exibir_Disponibilidade
export const exibir_Disponibilidade = async (req:Request, res:Response) => {
    const q = "call exibir_Disponibilidade(?)"

    const values = [
        req.params.idProfissional
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

// exibir_Pro_Disponivel
export const exibir_Pro_Disponivel = async (req:Request, res:Response) => {
    const q = "call exibir_Pro_Disponivel(?)"

    const values = [
        req.params.data_Atual
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

// alterar_Disponibilidade
export const alterar_Disponibilidade = async (req:Request, res:Response) => {
    const q = "call alterar_Disponibilidade(?, ?, ?)"

    const values = [
        req.body.idDisponibilidade,
        req.body.hora_Inicial,
        req.body.hora_Final
    ]

    db.query(q, [...values], (err) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(values)
    })
}

// excluir_Disponibilidade
export const excluir_Disponibilidade = async (req:Request, res:Response) => {
    const q = "call excluir_Disponibilidade(?)"

    const values = [
        req.body.idDisponibilidade
    ]

    db.query(q, [values], (err, data) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(data)
    })
}
