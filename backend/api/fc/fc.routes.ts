import express, { Router } from 'express'

import { getFcs, getFc, updateFc } from './fc.controller'

export const fcRoutes: Router = express.Router()

fcRoutes.get('/', getFcs)
fcRoutes.get('/:id', getFc)
fcRoutes.put('/:id', updateFc)



