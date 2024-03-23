const router = require('express').Router()
const authController = require('../controllers/authController')
const middlewere = require('../middlewere/atuthentications')

router.post('/register', middlewere.verifToken, middlewere.isAdmin, authController.addUser)
router.post('/login', authController.loginUser)

module.exports = router