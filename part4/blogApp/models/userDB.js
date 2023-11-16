const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  name: { type: String },
  username: { type: String, required: true, minlength: 3, unique: true },
  password: { 
    type: String,
    required: true
  }
})

userSchema.set('toJSON', {
  transform: (_, user) => {
    const userId = String(user._id)
    delete user._id
    delete user.__v

    return {
      id: userId,
      name: user.name,
      username: user.username
    }
  }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)