const router = require('express').Router()
const hrController = require('../controllers/hrController')

router.put('/pengajuan-cuti/:id', hrController.updateApplication)
router.get('/data-kehadiran', hrController.getAttendance)
router.get('/data-pengajuan-cuti', hrController.getAllApplication)

module.exports = router