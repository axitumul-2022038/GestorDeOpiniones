'use strict'

import Opiniones from "./opiniones.model.js"
import { checkUpdateOpinion } from "../utils/validator.js"
import jwt from "jsonwebtoken"

export const test = (req , res)=>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const register = async(req, res)=>{
    try{
        let data = req.body
        let opinones = new Opiniones(data)
        await opinones.save() 
        return res.send({message: `opinon registered correctly ${opinones.titulo}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering opinion', err: err})
    }
}

export const update = async(req, res)=>{ 
    try{
        let { id } = req.params  
        let data = req.body
        let update = checkUpdateOpinion(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
        let updatedOpinion = await Opiniones.findOneAndUpdate(
            {_id: id},
            data, 
            {new: true}
        )
        if(!updatedOpinion) return res.status(401).send({message: 'Opinion not found and not updated'})
        return res.send({message: 'Updated opinion', updatedOpinion})
    }catch(err){
        console.error(err)
        if(err.keyValue.name) return res.status(400).send({message: `Opinion ${err.keyValue.titulo} is alredy taken`})
        return res.status(500).send({message: 'Error updating opinion'})
    }
}

export const deleteO = async(req, res)=>{
    try{
        let {id} = req.params
        let secretKey = process.env.SECRET_KEY
        let {authorization} = req.headers
        let {uid} = jwt.verify(authorization, secretKey)
        const opinion = await Opiniones.findById(id)

        if(opinion.autor.toString() == uid){
            let deletedOpinion = await Opiniones.findOneAndDelete({_id: id})
            if(!deletedOpinion) return res.status(404).send({message: 'the opinion is not found'})
            return res.send({message: `the opinion for the user ${deletedOpinion.autor} is deleted `})
        } else{
            return res.status(404).send({message: 'cannot delete this opinion'})
        }

    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting opinion'})
    }
}

export const search = async(req, res)=>{
    try{
        let { search } = req.body
        let opinion = await Opiniones.find({titulo: search})
        if(!opinion) return res.status(404).send({message: 'Opinion not found'})
        return res.send({message: 'Opinion found', opinion})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error searching opinion'})
    }
}