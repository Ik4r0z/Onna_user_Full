import { Request, Response } from "express"

import { db } from "../db/connection"

import { hashSync, compareSync } from "bcrypt"

// cadastro_Tipo_Usuario  
export const cadastro_Tipo_Usuario = async (req:Request, res:Response) => {
    const q = "call cadastro_Tipo_Usuario(?, ?, ?, ?, ?, ?)"

    const values = [
        req.body.email,
        hashSync(req.body.senha, 10),
        req.body.nome,
        req.body.dataNasc,
        req.body.avatar,
        req.body.tipo_Usuario
    ]

    db.query(q, [...values], (err) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(values)
    })
}

// login_Tipo_Usuario 
export const login_Tipo_Usuario = async (req:Request, res:Response) => {
    const q = "call login_Tipo_Usuario(?)"

    const values = [
        req.body.email
    ]

    db.query(q, [values], (err, data) => {
        if(err){
            return res.status(500).json(err)
        }
        
        if (data[0].length === 0) {
            return res.status(404).json(err);
        }
        
        const tipoUsuario = data[0][0]

        const senhaInserida = req.body.senha
        const senhaArmazenada = tipoUsuario.senha

        const comp = compareSync(senhaInserida, senhaArmazenada)

        if(comp){
            return res.status(200).json(tipoUsuario);
        } 
        else{
            return res.status(401).json(err)
        }
    })
}

// modificar_Avatar
export const modificar_Avatar = async (req:Request, res:Response) => {
    const q = "call modificar_Avatar(?, ?)"

    const values = [
        req.body.idTipo_Usuario,
        req.body.avatar
    ]

    db.query(q, [...values], (err) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(values)
    })
}

// modificar_Senha
export const modificar_Senha = async (req:Request, res:Response) => {
    const q = "call modificar_Senha(?, ?)"

    const values = [
        req.body.idTipo_Usuario,
        hashSync(req.body.senha, 10)
    ]

    db.query(q, [...values], (err) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(values)
    })
}
