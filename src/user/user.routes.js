import express from 'express'
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js';
import {
    test,
    register, 
    login, 
    update, 
    deleteU,
    get,
    search
} from './user.controller.js';

const api = express.Router();

//RUTAS PÚBLICAS
api.get('/test', test)
api.post('/register', register)
api.post('/login', login)
api.get('/get', get)

//RUTAS PRIVADAS

api.put('/update/:id', [validateJwt, isAdmin], update)
api.delete('/delete/:id', [validateJwt], deleteU)
api.post('/search', [validateJwt, isAdmin], search)

export default api