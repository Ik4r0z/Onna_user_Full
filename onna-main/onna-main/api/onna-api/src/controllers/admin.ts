import { Request, Response } from "express"

import { db } from "../db/connection"

import { hashSync, compareSync } from "bcrypt"

// cadastro_Admin 
export const cadastro_Admin = async (req:Request, res:Response) => {
    const q = "call cadastro_Admin(?, ?)"

    const values = [
        req.body.username,
        hashSync(req.body.senha, 10)
    ]

    db.query(q, [...values], (err) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(values)
    })
}

// login_Admin
export const login_Admin = async (req:Request, res:Response) => {
    const q = "call login_Admin(?)"

    const values = [
        req.body.username
    ]

    db.query(q, [values], (err, data) => {
        if(err){
            return res.status(500).json(err)
        }
        
        if (data[0].length === 0) {
            return res.status(404).json(err);
        }
        
        const admin = data[0][0]

        const senhaInserida = req.body.senha
        const senhaArmazenada = admin.senha

        const comp = compareSync(senhaInserida, senhaArmazenada)

        if(comp){
            return res.status(200).json(admin);
        } 
        else{
            return res.status(401).json(err)
        }
    })
}