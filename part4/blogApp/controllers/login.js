const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/userDB')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  console.log('USER', user);
  
  const isPasswordCorrect = user === null 
  ? response.status(404).json({ error: `User: ${username} not found`})
  : await bcrypt.compare(password, user.password) // found user; compare input password to db password hash

  if (!isPasswordCorrect) {
    return response.status(400).json({ error: `Password for ${username} is incorrect`})
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = await jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, ...userForToken })
})


module.exports = loginRouter