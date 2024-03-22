require('dotenv').config()
const monggose = require('mongoose')

const mongodbURL = process.env.MONGODB_URL

const db = async()=> {
    try {
        const con = await monggose.connect(mongodbURL)       
        console.log(`mongodb connected: ${con.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = db