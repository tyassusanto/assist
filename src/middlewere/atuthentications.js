const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const verifToken = (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    } else {
        return res.status(403).json({ error: 'Token dibutuhkan' })
    }
    try {
        const secretKey = process.env.SECRET_KEY
        const decoded = jwt.verify(token, secretKey)
        req.username = decoded.username
        req.level = decoded.level
        next()
    } catch (err) {
        console.log(err)
    }
}

const isAdmin = (req, res, next) => {
    const level = req.level;
    if (level === 'Administrator') {
        next();
    } else {
        return res.status(403).json({ error: 'Permintaan ditolak' })
    }
}

const isHr = (req, res, next) => {
    const level = req.level;
    if (level === 'HR') {
        next();
    } else {
        return res.status(403).json({ error: 'Permintaan ditolak' })
    }
}


module.exports = {
    verifToken,
    isAdmin,
    isHr
}