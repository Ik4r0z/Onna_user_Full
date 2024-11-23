import { Request, Response } from "express"

import { db } from "../db/connection"

// exibir_Artigo_Genero
export const exibir_Artigo_Genero = async (req:Request, res:Response) => {
    const q = "call exibir_Artigo_Genero(?)"

    const values = [
        req.params.idGenero
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

// artigo_Selecionado
export const artigo_Selecionado = async (req:Request, res:Response) => {
    const q = "call artigo_Selecionado(?)"

    const values = [
        req.params.idArtigo
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

// consulta_Titulo_Artigo
export const consulta_Titulo_Artigo = async (req:Request, res:Response) => {
    const q = "call consulta_Titulo_Artigo(?)"

    const values = [
        req.params.titulo
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

// exibir_Artigos
export const exibir_Artigos = async (req:Request, res:Response) => {
    const q = "call exibir_Artigos()"

    db.query(q, (err, data) => {
        if(err){
            return res.status(500).json(err)
        }

        if (data[0].length === 0) {
            return res.status(404).json(err);
        }

        return res.status(200).json(data[0])
    })
}
