const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
  console.log('AUTH', request.get('authorization'))
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

notesRouter.get('/', async (request, response) => {
  const allNotes = await Note.find({}).populate('user', { notes: 0 })
  response.json(allNotes)
})

notesRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id
  const note = await Note.findById(id)
  if (note) response.json(note)
  else response.status(404).end()
})

notesRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  const note = await Note.findByIdAndDelete(id)

  if (note) {
    console.log(`Note: '${note.content}' successfully deleted.`)
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

notesRouter.post('/', async (request, response, next) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

  console.log('DECODED TOKEN', decodedToken)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const note = new Note({
    content: request.body.content,
    important: request.body.important || false,
    user: user.id,
    date: new Date()
  })

  const savedNote = await note.save()
  user.notes = [...user.notes, savedNote._id]
  await user.save()

  response.status(201).json(savedNote)
})

notesRouter.put('/:id', async (request, response, next) => {
  const { content, important } = request.body

  try {
    const note = await Note.findByIdAndUpdate(
      request.params.id,
      { content, important },
      { new: true, runValidators: true, context: 'query' }
    )

    if (note) {
      console.log(`Note: '${note.content}' successfully updated`)
      return response.json(note)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})


module.exports = notesRouter