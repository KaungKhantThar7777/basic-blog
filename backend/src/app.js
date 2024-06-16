import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import postRouter from './routes/post.js'

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/api/v1', postRouter)

export { app }
