const mongoose = require('mongoose');

const LeaveApplicationSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pengajuan', 'Disetujui', 'Ditolak',],
        default: 'Pengajuan'
    },
    reason: {
        type: String
    },
    approver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true }
);

const LeaveApplication = mongoose.model('LeaveApplication', LeaveApplicationSchema)

module.exports = LeaveApplication
