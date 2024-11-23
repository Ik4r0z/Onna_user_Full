import { Request, Response } from "express"

import { db } from "../db/connection"

// criar_Postagem
export const criar_Postagem = async (req:Request, res:Response) => {
    const q = "call criar_Postagem(?, ?, ?, ?, ?)"

    const values = [
        req.body.titulo,
        req.body.subtitulo,
        req.body.imagem,
        req.body.idTipo_Usuario,
        req.body.idForum
    ]

    db.query(q, [...values], (err) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(values)
    })
}

// exibir_Postagem_Especifica
export const exibir_Postagem_Especifica = async (req:Request, res:Response) => {
    const q = "call exibir_Postagem_Especifica(?)"

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

// exibir_Postagem_Popular
export const exibir_Postagem_Popular = async (req:Request, res:Response) => {
    const q = "call exibir_Postagem_Popular()"

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

// exibir_Postagem_Forum
export const exibir_Postagem_Forum = async (req:Request, res:Response) => {
    const q = "call exibir_Postagem_Forum(?)"

    const values = [
        req.params.idForum
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

// consulta_Titulo_Postagem
export const consulta_Titulo_Postagem = async (req:Request, res:Response) => {
    const q = "call consulta_Titulo_Postagem(?, ?)"

    const values = [
        req.params.titulo,
        req.params.idForum
    ]

    db.query(q, [...values], (err, data) => {
        if(err){
            return res.status(500).json(err)
        }
        
        if (data[0].length === 0) {
            return res.status(404).json(err);
        }

        return res.status(200).json(data[0])
    })
}

// exibir_Postagem_Geral
export const exibir_Postagem_Geral = async (req:Request, res:Response) => {
    const q = "call exibir_Postagem_Geral()"

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

// exibir_Postagem_Propria
export const exibir_Postagem_Propria = async (req:Request, res:Response) => {
    const q = "call exibir_Postagem_Propria(?)"

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

// contagem_Postagem
export const contagem_Postagem = async (req:Request, res:Response) => {
    const q = "call contagem_Postagem(?)"

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

// alterar_Postagem
export const alterar_Postagem = async (req:Request, res:Response) => {
    const q = "call alterar_Postagem(?, ?, ?, ?)"

    const values = [
        req.body.titulo,
        req.body.subtitulo,
        req.body.imagem,
        req.body.idPostagem
    ]

    db.query(q, [...values], (err) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(values)
    })
}

// excluir_Postagem
export const excluir_Postagem = async (req:Request, res:Response) => {
    const q = "call excluir_Postagem(?)"

    const values = [
        req.body.idPostagem
    ]

    db.query(q, [values], (err) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(values)
    })
}

// gostei_Postagem
export const gostei_Postagem = async (req:Request, res:Response) => {
    const q = "call gostei_Postagem(?)"

    const values = [
        req.body.idPostagem
    ]

    db.query(q, [values], (err) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(values)
    })
}

// desgostei_Postagem
export const desgostei_Postagem = async (req:Request, res:Response) => {
    const q = "call desgostei_Postagem(?)"

    const values = [
        req.body.idPostagem
    ]

    db.query(q, [values], (err) => {
        if(err){
            return res.status(500).json(err)
        }

        return res.status(200).json(values)
    })
}
