const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  name: { type: String },
  username: { type: String, required: true, minlength: 3, unique: true },
  password: { 
    type: String,
    required: true
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (_, user) => {
    const userId = String(user._id)
    delete user._id
    delete user.__v

    return {
      id: userId,
      name: user.name,
      username: user.username,
      blogs: user.blogs
    }
  }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)