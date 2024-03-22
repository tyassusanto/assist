const mongoose = require('mongoose');

const AttendanceSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
        enum: ['Absen Masuk', 'Absen Pulang'],
        default: 'Absen Masuk',
        required: true
    },
    attendanceTime: {
        type: String,
        enum: ['Tepat Waktu', 'Telat'],
        required: true
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Attendance', AttendanceSchema);
