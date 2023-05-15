import express, { Application } from 'express'
import cors from "cors"
import { globalRoutes } from './routes'

const app: Application = express()

app.use(express.json())
app.use(cors())
app.use(globalRoutes)

export default app