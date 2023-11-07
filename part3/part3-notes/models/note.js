const mongoose = require('mongoose')

require('dotenv').config()

const url = process.env.MONGO_DB_URI

console.log(`Connecting to DB @ ${url}`)

mongoose.set('strictQuery',false)

mongoose
  .connect(url)
  .then(console.log('Connected to DB'))
  .catch(error => {
    console.error(`Error connecting to db: ${error}`)
  })

const noteSchema = new mongoose.Schema({
  content: { type: String, minLength: 5, required: true },
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v
    return {
      id: String(ret._id),
      content: ret.content,
      important: ret.important
    }
  }
})

module.exports = mongoose.model('Note', noteSchema)