const notesRouter = require('express').Router()
const Note = require('../models/note')


notesRouter.get('/', (request, response) => {
  Note
    .find({})
    .then(notes => response.json(notes))
})

notesRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id
  try {
    const note = await Note.findById(id)
    if (note) response.json(note)
    else response.status(404).end()
  } catch (error) {
    console.log('ERROR')
    next(error)
  }
})

notesRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  try {
    const note = await Note.findByIdAndDelete(id)
    if (note) {
      console.log(`Note: '${note.content}' successfully deleted.`)
      response.status(204).end()
    } else {
      response.status(404).end()
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

notesRouter.post('/', (request, response, next) => {
  if (!request.body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: request.body.content,
    important: request.body.important || false,
  })

  note
    .save()
    .then(savedNote => response.json(savedNote))
    .catch(error => next(error))
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