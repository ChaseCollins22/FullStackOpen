const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String },
  username: { type: String, required: true, minLength: 3 },
  password: { type: String, required: true, minLength: 3 }
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

module.exports = mongoose.model('User', userSchema)