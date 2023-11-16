const usersRouter = require('express').Router();
const { Error } = require('mongoose');
const User = require('../models/userDB')
const bcrypt = require('bcrypt')

require('express-async-errors')

usersRouter.get('/', async (request, response) => {
  const allUsers = await User.find({})
  response.json(allUsers)

})

usersRouter.post('/', async (request, response, next) => {
  const { name, username, password } = request.body
  if (password.length < 3) return next(new Error('password must be at least 3 characters long'))

  console.log('BODY', request.body)

  const passwordHash = await bcrypt.hash(password, 10)

  const newUser = new User({ ...request.body, password: passwordHash })

  const savedUser = await newUser.save()

  console.log('USER SUCCESSFULLY SAVED:', savedUser);

  response.json(savedUser)
})






module.exports = usersRouter