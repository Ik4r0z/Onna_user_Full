import { Request, Response } from "express"

import { db } from "../db/connection"

// cadastrar_Calendario 
export const cadastrar_Calendario = async (req:Request, res:Response) => {
    const q = "call cadastrar_Calendario(?, ?)"

    const values = [
        req.body.dia_Marcado,
        req.body.idUsuario
    ]

    db.query(q, [...values], (err) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(values)
    })
}

// alterar_Calendario
export const alterar_Calendario = async (req:Request, res:Response) => {
    const q = "call alterar_Calendario(?, ?, ?)"

    const values = [
        req.body.dia_Marcado,
        req.body.periodo,
        req.body.idUsuario
    ]

    db.query(q, [...values], (err) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(values)
    })
}

// definir_Intervalo_Calendario
export const definir_Intervalo_Calendario = async (req:Request, res:Response) => {
    const q = "call definir_Intervalo_Calendario(?)"

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