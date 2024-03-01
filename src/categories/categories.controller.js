'use strict'

import Categories from "./categories.model.js"
import { checkUpdate } from "../../utils/validator.js"

export const test = (req , res)=>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const register = async(req, res)=>{
    try{
        let data = req.body
        let categories = new Categories(data)
        await categories.save() 
        return res.send({message: `category registered correctly ${categories.name}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering category', err: err})
    }
}

export const get = async (req, res) => {
    try {
        let categories = await Categories.find()
        return res.send({ categories })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting category' })
    }
}

export const update = async(req, res)=>{ 
    try{
        let { id } = req.params  
        let data = req.body
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
        let updatedCategory = await Categories.findOneAndUpdate(
            {_id: id},
            data, 
            {new: true}
        )
        if(!updatedCategory) return res.status(401).send({message: 'Category not found and not updated'})
        return res.send({message: 'Updated category', updatedCategory})
    }catch(err){
        console.error(err)
        if(err.keyValue.name) return res.status(400).send({message: `Category ${err.keyValue.name} is alredy taken`})
        return res.status(500).send({message: 'Error updating category'})
    }
}

export const deleteC = async(req, res)=>{
    try{
        let { id } = req.params
        let deletedCategory = await Categories.findOneAndDelete({_id: id}) 
        if(!deletedCategory) return res.status(404).send({message: 'Category not found and not deleted'})
        return res.send({message: `Category with name ${deletedCategory.name} deleted successfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting category'})
    }
}

export const search = async(req, res)=>{
    try{
        let { search } = req.body
        let categories = await Categories.find({name: search})
        if(!categories) return res.status(404).send({message: 'Category not found'})
        return res.send({message: 'Category found', categories})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error searching category'})
    }
}