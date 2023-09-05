import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

import * as tempService from './services/temp.service'
import * as timeService from './services/time.service'
import * as alarmService from './api/alarm/alarm.service'
import { fcRoutes } from './api/fc/fc.routes'
import { alarmRoutes } from './api/alarm/alarm.routes'
import { userRoutes } from './api/user/user.routes'
import { setupSocketAPI } from './services/socket.service'

dotenv.config()

const app: Express = express()
import * as HTTP from "http"
const http: HTTP.Server = HTTP.createServer(app)

app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))
setupSocketAPI(http)

const corsOptions = {
  origin: ['http://127.0.0.1:5173', 'http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
  credentials: true
}

app.use(cors(corsOptions))

const port = process.env.PORT || 3030

app.use('/api/fc', fcRoutes)
app.use('/api/alarm', alarmRoutes)
app.use('/api/user', userRoutes)


app.get('/', (req: Request, res: Response): void => {
  res.send('Express + TypeScript Server')
})

http.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

tempService.startTempInterval()
timeService.startTimeInterval()
alarmService.startAckInterval()

