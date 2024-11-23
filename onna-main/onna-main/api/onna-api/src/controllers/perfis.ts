import { Request, Response } from "express"

import { db } from "../db/connection"

// cadastro_Perfil_Pessoal 
export const cadastro_Perfil_Pessoal = async (req:Request, res:Response) => {
    const q = "call cadastro_Perfil_Pessoal(?, ?)"

    const values = [
        req.body.idUsuario,
        req.body.idTipo_Usuario
    ]

    db.query(q, [...values], (err) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(values)
    })
}

// cadastro_Perfil_Profissional
export const cadastro_Perfil_Profissional = async (req:Request, res:Response) => {
    const q = "call cadastro_Perfil_Profissional(?, ?, ?, ?, ?, ?)"

    const values = [
        req.body.idProfissional,
        req.body.crm,
        req.body.crp,
        req.body.uf,
        req.body.area_Formacao,
        req.body.idTipo_Usuario
    ]

    db.query(q, [...values], (err) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(values)
    })
}

// exibir_Dados_Profissional
export const exibir_Dados_Profissional = async (req:Request, res:Response) => {
    const q = "call exibir_Dados_Profissional(?)"

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

        const perfilProfissional = data[0][0]

        return res.status(200).json(perfilProfissional)
    })
}

// modificar_Area_Formacao
export const modificar_Area_Formacao = async (req:Request, res:Response) => {
    const q = "call modificar_Area_Formacao(?, ?)"

    const values = [
        req.body.idTipo_Usuario,
        req.body.area_Formacao
    ]

    db.query(q, [...values], (err) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(values)
    })
}
