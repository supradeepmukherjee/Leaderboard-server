import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { corsOptions } from './constants/config.js'
import { errorMiddleware } from './middlewares/error.js'
import routes from './routes.js'

dotenv.config({ path: './.env' })

const envMode = process.env.NODE_ENV.trim() || 'PRODUCTION'

const app = express()

app.use(express.json())
app.use(cors(corsOptions))

app.use('/api', routes)

app.use(errorMiddleware)

export { envMode }
export default app