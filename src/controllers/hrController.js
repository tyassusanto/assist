const dotenv = require('dotenv')
dotenv.config()

const usersModel = require('../models/usersModel')
const attendanceModel = require('../models/attendanceModel')
const leaveApplicationModel = require('../models/leaveApplicationModel')

const getAllApplication = async (req, res) => {
    try {
        const allApplication = await leaveApplicationModel.find()
        res.status(200).json(allApplication)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getAttendance = async (req, res) => {
    try {
        const allAttendances = await attendanceModel.find()
        res.status(200).json(allAttendances)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateApplication = async (req, res) => {
    try {
        const { id } = req.params
        const { approver, reason, status } = req.body

        const application = await leaveApplicationModel.findByIdAndUpdate(id, {
            reason,
            status,
            approver
        }, {
            new: true
        })

        if (!application) {
            return res.status(404).json(application);
        }

        const updateUserApplication = await application.save();

        res.status(200).json(updateUserApplication)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAttendance,
    updateApplication,
    getAllApplication
}