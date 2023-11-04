require('dotenv').config()

const express = require('express')
const cors = require('cors');
const Note = require('./models/note')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))


let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello again from the backend</h1>');
})

app.get('/api/notes', (request, response) => {
  Note
    .find({})
    .then(notes => response.json(notes))
});

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  
  if (note) response.json(note)
  response.statusMessage = "No note found";
  response.status(404).end()
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id);

  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  function generateId() {
    const maxId = notes.length > 0 
          ? Math.max.apply(null, notes.map(note => note.id))
          : 0
    return maxId + 1
  }

  if (!request.body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content: request.body.content,
    important: request.body.important || false,
    id: generateId()
  }
  
  notes = [...notes, note]

  response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Sever running on port: ${PORT}`);
})

