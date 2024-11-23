import { Request, Response } from "express"

import { db } from "../db/connection"

// criar_Relatorio_Humor 
export const criar_Relatorio_Humor = async (req:Request, res:Response) => {
    const q = "call criar_Relatorio_Humor(?, ?, ?, ?)"

    const values = [
        req.body.idUsuario,
        req.body.humor,
        req.body.sintoma,
        req.body.secrecao_Vaginal      
    ]

    db.query(q, [...values], (err) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(values)
    })
}

// criar_Relatorio_Remedio
export const criar_Relatorio_Remedio = async (req:Request, res:Response) => {
    const q = "call criar_Relatorio_Remedio(?, ?, ?, ?)"

    const values = [
        req.body.idUsuario,
        req.body.remedio,
        req.body.intervalo_Hora,
        req.body.qntd_Agua      
    ]

    db.query(q, [...values], (err) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(values)
    })
}

// criar_Relatorio_Atividade
export const criar_Relatorio_Atividade = async (req:Request, res:Response) => {
    const q = "call criar_Relatorio_Atividade(?, ?, ?, ?)"

    const values = [
        req.body.idUsuario,
        req.body.atividade_Fisica,
        req.body.atividade_Feita,
        req.body.apos_Atividade     
    ]

    db.query(q, [...values], (err) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(values)
    })
}

// exibir_Relatorio_Humor
export const exibir_Relatorio_Humor = async (req:Request, res:Response) => {
    const q = "call exibir_Relatorio_Humor(?, ?)"

    const values = [
        req.params.idUsuario,
        req.params.data_Relatorio
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

// exibir_Relatorio_Remedio
export const exibir_Relatorio_Remedio = async (req:Request, res:Response) => {
    const q = "call exibir_Relatorio_Remedio(?, ?)"

    const values = [
        req.params.idUsuario,
        req.params.data_Relatorio
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

// exibir_Relatorio_Atividade
export const exibir_Relatorio_Atividade = async (req:Request, res:Response) => {
    const q = "call exibir_Relatorio_Atividade(?, ?)"

    const values = [
        req.params.idUsuario,
        req.params.data_Relatorio
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
