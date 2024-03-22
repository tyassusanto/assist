const dotenv = require('dotenv')
const userModel = require('../models/usersModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
dotenv.config()

const addUser = async (req, res) => {
    try {
        const {fullName, username, password} = req.body
        if(!username) return res.status(400).json({error: 'Username tidak boleh kosong'})
        if(!fullName) return res.status(400).json({error: 'Nama tidak boleh kosong'})
        if(!password) return res.status(400).json({error: 'Password tidak boleh kosong'})
        const usernameCheck = await userModel.findOne({username})
        if(usernameCheck) {
            return res.status(400).json({error: 'username sudah digunakan, silahkan masukan username lain'})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            fullName,
            username,
            password: hashedPassword,
        })
        
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500)
        console.log(`error addUser: ${error}`)
    }
}

const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body
    const user = await userModel.findOne({username})
    !user && res.status(404).json({error: 'username tidak terdaftar'})

    const userPassword = await bcrypt.compare(password, user.password)
    !userPassword && res.status(400).json({error: 'password tidak sesuai'})

    const payload = {
        _id: user._id,
        username: user.username,
        fullName: user.fullName
    }
    const secretKeyJwt = process.env.SECRET_KEY
    const expToken = {expiresIn: '1 days'}
    const token = jwt.sign(payload, secretKeyJwt, expToken)

    res.status(200).json({
        payload,
        token
    })
    } catch (error) {
        res.status(500)
       console.log(error) 
    }  
}

module.exports = {
    addUser,
    loginUser
}