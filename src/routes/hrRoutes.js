const router = require('express').Router()
const hrController = require('../controllers/hrController')
const middlewere = require('../middlewere/atuthentications')

router.put('/pengajuan-cuti/:id', hrController.updateApplication)
router.get('/data-kehadiran', middlewere.verifToken, middlewere.isHr, hrController.getAttendance)
router.get('/data-pengajuan-cuti', hrController.getAllApplication)

module.exports = router