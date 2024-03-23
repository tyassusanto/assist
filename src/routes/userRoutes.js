const router = require('express').Router()
const userController = require('../controllers/userController')
const middlewere = require('../middlewere/atuthentications')

router.post('/absen-masuk', middlewere.verifToken, userController.attendance)
router.put('/absen-pulang/:id', middlewere.verifToken, userController.updateAttendance)
router.post('/pengajuan-cuti', middlewere.verifToken, userController.createApplication)

module.exports = router