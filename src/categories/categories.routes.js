'use strict'

import { Router } from "express"
import {validateJwt } from "../../middlewares/validate-jwt.js"
import { register,test,get,update,deleteC, search } from "./categories.controller.js"

const api = Router()

api.get('/test', test)
api.post('/register',[validateJwt], register)
api.get('/get', get)
api.put('/update/:id',[validateJwt], update)
api.delete('/delete/:id',[validateJwt], deleteC)
api.post('/search',[validateJwt], search)

export default api