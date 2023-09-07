import { Request, Response } from 'express'
import { ParsedQs } from 'qs'
import { query, getById, getByParams, update, add, remove } from './user.service'
import { User } from '../../types'


async function getUsers(req: Request, res: Response) {
    try {
        const users: User[] = await query()
        res.send(users)
    } catch (err) {
        res.status(500).send({ err: 'Failed to find users list' })
    }
}

async function getUserById(req: Request, res: Response) {
    try {
        const userId = req.params.id
        const user = await getById(userId)
        res.send(user)
    } catch (err) {
        res.status(500).send({ err: 'Failed to find user' })
    }
}

async function getUserByParams(req: Request, res: Response) {
    try {
        const { userName, password }: ParsedQs = req.query as { userName: string, password: string }
        const user = await getByParams(userName, password)
        res.send(user)
    } catch (err) {
        res.status(500).send({ err: 'Failed to find user' })
    }
}

async function updateUser(req: Request, res: Response) {
    try {
        const userId = req.params.id
        const { password, authorization } = req.body
        const newUser = await update(userId, password, authorization)
        res.send(newUser)
    } catch (err) {
        res.status(500).send({ err: 'Failed to update user' })
    }
}

async function addUser(req: Request, res: Response) {
    try {
        const { name, password, authorization } = req.body
        const newUser = await add(name, password, authorization)
        res.send(newUser)
    } catch (err) {
        res.status(500).send({ err: 'Failed to add user' })
    }
}

async function removeUser(req: Request, res: Response) {
    try {
        const userId = req.params.id
        console.log('removeUser', userId);
        await remove(userId)
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
