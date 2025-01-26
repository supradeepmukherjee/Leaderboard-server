import { Router } from 'express'
import { createUser, getUserNames, getUsers, rewardPoints } from './controllers.js'

const app = Router()

app.post('/new-user', createUser)
app.get('/names', getUserNames)
app.put('/reward', rewardPoints)
app.get('/leaderboard', getUsers)

export default app