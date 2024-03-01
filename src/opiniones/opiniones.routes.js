'use strict'

import { Router } from "express"
import { validateJwt } from "../../middlewares/validate-jwt.js"
import { register,test,update,deleteO, search } from "./opiniones.controller.js"

const api = Router()

api.get('/test', test)
api.post('/register',[validateJwt], register)
api.put('/update/:id',[validateJwt], update)
api.delete('/delete/:id',[validateJwt], deleteO)
api.post('/search',[validateJwt], search)

export default api