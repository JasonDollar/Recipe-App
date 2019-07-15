const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'A user must have an username'],
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
  },
  joinDate: {
    type: Date,
    default: Date.now(),
  },
  favorites: {
    type: [Schema.Types.ObjectId],
    ref: 'Recipe',
  },
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  const hashedPass = await bcrypt.hash(this.password, 12)
  this.password = hashedPass
  next()
})

const User = model('User', userSchema)

module.exports = User