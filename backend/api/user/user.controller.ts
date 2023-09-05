import { Request, Response } from 'express'
import { ParsedQs } from 'qs'

import * as userService from './user.service'
import { Users } from '../../services/types'


async function getUsers(req: Request, res: Response) {
    try {
        const users: Users = await userService.query()
        res.send(users)
    } catch (err) {
        res.status(500).send({ err: 'Failed to find users list' })
    }
}

async function getUserById(req: Request, res: Response) {
    try {
        const userId = req.params.id
        const user = await userService.getById(userId)
        res.send(user)
    } catch (err) {
        res.status(500).send({ err: 'Failed to find user' })
    }
}

async function getUserByParams(req: Request, res: Response) {
    try {
        const { userName, password } : ParsedQs = req.query as { userName: string, password: string }
        const user = await userService.getByParams(userName, password)
        res.send(user)
    } catch (err) {
        res.status(500).send({ err: 'Failed to find user' })
    }
}

async function updateUser(req: Request, res: Response) {
    try {
        const userId = req.params.id
        const { password, authorization } = req.body
        const newUser = await userService.update(userId, password, authorization)
        res.send(newUser)
    } catch (err) {
        res.status(500).send({ err: 'Failed to update user' })
    }
}

async function addUser(req: Request, res: Response) {
    try {
        const { name, password, authorization } = req.body
        const newUser = await userService.add(name, password, authorization)
        res.send(newUser)
    } catch (err) {
        res.status(500).send({ err: 'Failed to add user' })
    }
}

async function removeUser(req: Request, res: Response) {
    try {
        const userId = req.params.id
        console.log('removeUser', userId);
        await userService.remove(userId)
        res.send('Succesffully')
    } catch (err) {
        res.status(500).send({ err: 'Failed to delete user' })
    }
}

export {
    getUsers,
    getUserById,
    getUserByParams,
    updateUser,
    addUser,
    removeUser
}
