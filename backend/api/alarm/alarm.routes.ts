import express, { Router } from 'express'
import { getAlarms, updateAlarm, updateAll } from './alarm.controller'

export const alarmRoutes: Router = express.Router()

alarmRoutes.get('/', getAlarms)
alarmRoutes.put('/', updateAll)
alarmRoutes.put('/:id',updateAlarm)



