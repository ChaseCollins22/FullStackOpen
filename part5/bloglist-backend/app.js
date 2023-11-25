const config = require('./utils/config')
const mongoose = require('mongoose')
const cors = require('cors')

const blogRouter = require('./controllers/blogController')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
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
app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)

module.exports = app