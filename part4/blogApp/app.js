const config = require('./utils/config')
const mongoose = require('mongoose')
const cors = require('cors')

const blogRouter = require('./controllers/blogController')
const usersRouter = require('./controllers/users')
const Blog = require('./models/blogDB');
const middleware = require('./utils/middleware')

const express = require('express')
const app = express()

mongoose.set('strictQuery', false)

console.log('Connecting to DB...');

mongoose
  .connect(config.MONGO_DB_URI)
  .then(() => {
    console.log(`Connected to ${config.MONGO_DB_URI}`)
  })
  .catch((error) => {
    console.log(`Failed to connect to DB...`);
    console.log(error);
  });

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)

app.use(middleware.errorHandler)

module.exports = app