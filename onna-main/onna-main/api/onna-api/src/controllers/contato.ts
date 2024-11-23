import { Request, Response } from "express"

import { db } from "../db/connection"

// cadastro_Contato
export const cadastro_Contato = async (req:Request, res:Response) => {
    const q = "call cadastro_Contato(?)"

    const values = [
        req.body.idTipo_Usuario
    ]

    db.query(q, [values], (err) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(values)
    })
}

// exibir_Lista_Contatos
export const exibir_Lista_Contatos = async (req:Request, res:Response) => {
    const q = "call exibir_Lista_Contatos(?)"

    const values = [
        req.params.idTipo_Usuario
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