const dotenv = require('dotenv')
dotenv.config()

const usersModel = require('../models/usersModel')
const attendanceModel = require('../models/attendanceModel')
const leaveApplicationModel = require('../models/leaveApplicationModel')

const attendance = async (req, res) => {
    try {
        const { fullName, userId } = req.body
        const user = await usersModel.findOne({ fullName })
        !user && res.status(404).json({ error: 'Nama tidak terdaftar' })

        const currentTime = new Date()
        const expectedTime = new Date(currentTime)
        expectedTime.setHours(2)
        expectedTime.setMinutes(36)

        isLate = currentTime > expectedTime

        const attendanceTime = isLate ? 'Telat' : 'Tepat Waktu'

        const newAttendance = new attendanceModel({
            fullName,
            userId,
            attendanceTime
        })
        const savedAttendance = await newAttendance.save()

        res.status(200).json(savedAttendance)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        console.log(error)
    }

}

const updateAttendance = async (req, res) => {
    try {
        const { userId } = req.body
        const attendanceId = req.params.id // id Attendance

        const attendance = await attendanceModel.findById(attendanceId)
        if (!attendance) {
            return res.status(404).json({ error: 'Belum absen masuk' })
        }

        if (attendance.userId.toString() !== userId) {
            return res.status(400).json({ error: 'Tidak diizinkan' })
        }

        if (attendance.remarks === 'Absen Pulang') {
            return res.status(400).json({ error: 'Sudah absen pulang' })
        }

        attendance.remarks = 'Absen Pulang'

        const updatedAttendance = await attendance.save();

        res.status(200).json(updatedAttendance)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const createApplication = async (req, res) => {
    try {
        const { userId, start_date, end_date, purpose } = req.body

        const newLeaveApplication = new leaveApplicationModel({
            userId,
            start_date,
            end_date,
            purpose
        });

        await newLeaveApplication.save();

        res.status(201).json({ message: 'Berhasil mengajukan cuti', data: newLeaveApplication })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {
    attendance,
    updateAttendance,
    createApplication
}

