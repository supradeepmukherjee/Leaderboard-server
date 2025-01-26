import { Router } from 'express'
import { createUser, getUsers, rewardPoints } from './controllers.js'

const app = Router()

app.post('/new-user', createUser)
app.put('/reward', rewardPoints)
app.get('/leaderboard', getUsers)

export default app