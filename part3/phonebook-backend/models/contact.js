require('dotenv').config()

const mongoose = require('mongoose');

const url = process.env.MONGO_DB_URI

console.log('Connecting to DB...');

mongoose.set('strictQuery',false)

mongoose
  .connect(url)
  .then(console.log('Connected to DB!'))
  .catch((error) => {
    console.log('Failed to connect to DB')
    console.log(error);
  })

const personSchema = new mongoose.Schema({
  name: { type: String, minLength: 3, required: true },
  number: { 
    type: String,
    minLength: 8,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      }
    },
    required: true 
  }
})

personSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.__v
    return {
      id: String(ret._id),
      name: ret.name,
      number: ret.number
    }
  }
})

module.exports = mongoose.model('Person', personSchema);
