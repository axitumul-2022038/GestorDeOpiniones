'use strict'

import { Router } from "express"
import { validateJwt } from "../middlewares/validate-jwt.js"
import { test, register, update, deleteCo } from "./comentarios.controller.js"

const api = Router()

api.get('/test', test)
api.post('/register',[validateJwt], register)
api.put('/update/:id',[validateJwt], update)
api.delete('/delete/:id',[validateJwt], deleteCo)

export default api