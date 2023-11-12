require('dotenv').config()

const MONGO_DB_URI = process.env.NODE_ENV === 'test'
? process.env.MONGO_DB_URI_TEST
: process.env.MONGO_DB_URI

const PORT = 3005

module.exports = { MONGO_DB_URI, PORT }