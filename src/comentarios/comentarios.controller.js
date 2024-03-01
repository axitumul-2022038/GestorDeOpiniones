'use strict'

import Comentarios from "./comentarios.model.js"
import { checkUpdate } from "../utils/validator.js"

export const test = (req , res)=>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const register = async(req, res)=>{
    try{
        let data = req.body
        let comentarios = new Comentarios(data)
        await comentarios.save() 
        return res.send({message: `comentario registered correctly ${comentarios.text}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering comentario', err: err})
    }
}

export const update = async(req, res)=>{ 
    try{
        let { id } = req.params  
        let data = req.body
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
        let updatedComentario = await Comentarios.findOneAndUpdate(
            {_id: id},
            data, 
            {new: true}
        )
        if(!updatedComentario) return res.status(401).send({message: 'Comentario not found and not updated'})
        return res.send({message: 'Updated comentario', updatedComentario})
    }catch(err){
        console.error(err)
        if(err.keyValue.name) return res.status(400).send({message: `Comentario ${err.keyValue.titulo} is alredy taken`})
        return res.status(500).send({message: 'Error updating Comentario'})
    }
}

export const deleteCo = async(req, res)=>{
    try{
        let { id } = req.params
        let deletedComentario = await Comentarios.findOneAndDelete({
            $and: [
                {user: data.user},
                {authorization: data.authorization}
            ]
        })         
        if(!deletedComentario) return res.status(404).send({message: 'Coemntario is not found and not deleted'})
        return res.send({message: `Opinion with text ${deletedComentario.text} deleted successfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting coemntario'})
    }
}