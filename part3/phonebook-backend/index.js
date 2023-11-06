const express = require('express');
const cors = require('cors')
const Person = require('./models/contact')

const app = express();

const morgan = require('morgan');
morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(cors())
app.use(express.static('dist'))

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

app.get('/api/persons', (request, response) => {
  Person
    .find({})
    .then(contacts => response.json(contacts))
})

app.get('/info', async (request, response, next) => {
  try {
    const dateNow = new Date().toString()
    const allContacts = await Person.find({})
    if (allContacts) {
      response.send(`<p>Phonebook has info for ${allContacts.length} people</p><p>${dateNow}</p>`)
    } else {
      response.status(404).end()
    }
  } catch(error) {
    next(error)
  }
})

app.get('/api/persons/:id', async (request, response, next) => {
  const id = request.params.id
  try { 
    const contact = await Person.findById(id)
    if (contact) response.json(contact)
    else response.status(404).end()
  } catch(error) {
    next(error)
  }
})

app.delete('/api/persons/:id', async (request, response, next) => {
  const id = request.params.id
  
  try {
    const contactToDelete = await Person.findByIdAndDelete(id)
    if (contactToDelete) {
      console.log(`Contact: ${contactToDelete.name, contactToDelete.number} successfully deleted`);
      return response.status(204).end()
    } else {
      response.status(404).json({ error: 'Contact not found' })
    }
  } catch (error) {
    next(error)
  }

})

app.post('/api/persons', (request, response) => {
  if (!request.body.name || !request.body.number) {
    return response.status(400).json({
      error: 'Name or number missing'
    })
  }

  const newContact = new Person({
    name: request.body.name,
    number: request.body.number
  })

  newContact
    .save(newContact)
    .then(newContact => response.json(newContact))
})

app.put('/api/persons/:id', async (request, response, next) => {
  const id = request.params.id;
  
  const updatedContact = {
    name: request.body.name,
    number: request.body.number
  }
  
  try {
    const contact = await Person.findByIdAndUpdate(id, updatedContact, { new: true })
    if (contact) {
      console.log(`Successfully updated contact: { name: ${contact.name}, number: ${contact.number} }`);
      response.json(contact)
    } else response.status(404).json({ error: 'Contact not found' })
  } catch (error) {
    next(error)
  }
})

function handleError(error, request, response, next) {

  if (error.name === 'CastError') {
    response.status(400).send(({ error: 'malformatted id '}))
  }

  next(error)
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

app.use(handleError)