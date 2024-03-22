const express = require('express')
const cors = require('cors')
const db = require('./src/connection/connection')

const app = express()

app.use(cors())
app.use(express.json())
db()

const port = 3001


app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})