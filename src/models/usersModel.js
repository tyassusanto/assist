const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
   fullName: {
      type: String,
      require: true,
   },
   username: {
      type: String,
      require: true,
      unique: true,
   },
   password: {
      type: String,
      require: true
   },
   level: {
      type: String,
      enum: ['Staff', 'HR', 'Administrator'],
      default: 'Staff',
      require: true
   }
},
   { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)