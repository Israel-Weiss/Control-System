import { Router } from 'express'
import { getUsers, getUserById, getUserByParams, updateUser, addUser, removeUser } from './user.controller'


export const userRoutes: Router = Router()

userRoutes.get('/', getUsers)
userRoutes.get('/check', getUserByParams)
userRoutes.get('/:id', getUserById)
userRoutes.put('/:id', updateUser)
userRoutes.post('/', addUser)
userRoutes.delete('/:id', removeUser)


