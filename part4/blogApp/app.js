const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const Blog = require('./models/blogDB');
const cors = require('cors')
const router = require('./controllers/blogController')
const express = require('express')
const app = express()

mongoose.set('strictQuery', false)

logger.info(`Connecting to DB...`)

mongoose
  .connect(config.MONGO_DB_URI)
  .then(() => {
    logger.info(`Connected to ${config.MONGO_DB_URI}`)
  })
  .catch((error) => {
    console.log(`Failed to connect to DB...`);
    console.log(error);
  });

app.use(cors())
app.use(express.json())
app.use('/', router)

module.exports = app