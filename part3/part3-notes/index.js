require('dotenv').config()

const express = require('express')
const cors = require('cors')
const Note = require('./models/note')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

app.get('/', (request, response) => {
  response.send('<h1>Hello again from the backend</h1>')
})

app.get('/api/notes', (request, response) => {
  Note
    .find({})
    .then(notes => response.json(notes))
})

app.get('/api/notes/:id', async (request, response, next) => {
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

app.delete('/api/notes/:id', async (request, response, next) => {
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

app.post('/api/notes', (request, response, next) => {
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

app.put('/api/notes/:id', async (request, response, next) => {
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

function unknownEndpoint(request, response) {
  return response.status(404).send({ error: 'unknown endpoint' })
}

function errorHandler(error, request, response, next) {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Sever running on port: ${PORT}`)
})

app.use(unknownEndpoint)
app.use(errorHandler)

