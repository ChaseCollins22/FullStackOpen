const express = require('express');
const app = express();

const morgan = require('morgan');
morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const MAX_CONTACTS = 500;

let contacts = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const generateId = () => {
  return Math.floor(Math.random() * MAX_CONTACTS)
}

app.get('/api/persons', (request, response) => {
  response.json(contacts)
})

app.get('/info', (request, response) => {
  const totalContacts = contacts.length
  const dateNow = new Date().toString()
  response.send(`<p>Phonebook has info for ${totalContacts} people</p><p>${dateNow}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const contact = contacts.find(contact => contact.id === id)

  if (contact) response.json(contact)

  return response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const contact = contacts.find(contact => contact.id === id);

  if (contact) {
    contacts = contacts.filter(contact => contact.id !== id)
    response.status(204).end()
  } else {
    response.statusMessage = 'Contact not found'
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
  if (!request.body.name || !request.body.number) {
    return response.status(400).json({
      error: 'Name or number missing'
    })
  }

  const contactExists = contacts.find(contact => {
    return (contact.name === request.body.name &&
           contact.number === request.body.number)
  })

  if (contactExists) return response.status(400).json({
    error: 'Contact already exists'
  })

  const newContact = {
    id: generateId(),
    name: request.body.name,
    number: request.body.number
  }

  contacts = [...contacts, newContact]

  response.json(newContact)
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})