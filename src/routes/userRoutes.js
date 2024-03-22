const router = require('express').Router()
const userController = require('../controllers/userController')

router.post('/absen-masuk', userController.attendance)
router.put('/absen-pulang/:id', userController.updateAttendance)
router.get('/data-kehadiran', userController.getAttendance)

module.exports = router