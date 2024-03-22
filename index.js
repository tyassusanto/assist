const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const db = require('./src/connection/connection')
const mongoose = require('mongoose')
dotenv.config()

const app = express()
const authRoutes = require('./src/routes/authRoutes')
const userRoutes = require('./src/routes/userRoutes')
const hrRoutes = require('./src/routes/hrRoutes')

db()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/hr', hrRoutes)

const port = 3001


app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})