const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Person = require('./models/contact');

const app = express();

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(cors());
app.use(express.static('dist'));

app.get('/api/persons', (request, response) => {
  Person
    .find({})
    .then((contacts) => response.json(contacts));
});

app.get('/info', async (request, response, next) => {
  try {
    const dateNow = new Date().toString();
    const allContacts = await Person.find({});
    if (allContacts) {
      response.send(`<p>Phonebook has info for ${allContacts.length} people</p><p>${dateNow}</p>`);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

app.get('/api/persons/:id', async (request, response, next) => {
  const { id } = request.params;
  try {
    const contact = await Person.findById(id);
    if (contact) response.json(contact);
    else response.status(404).end();
  } catch (error) {
    next(error);
  }
});

app.delete('/api/persons/:id', async (request, response, next) => {
  const { id } = request.params;

  try {
    const contactToDelete = await Person.findByIdAndDelete(id);
    if (contactToDelete) {
      console.log(`Contact: ${contactToDelete.name, contactToDelete.number} successfully deleted`);
      return response.status(204).end();
    }
    response.status(404).json({ error: 'Contact not found' });
  } catch (error) {
    next(error);
  }
});

app.post('/api/persons', (request, response, next) => {
  if (!request.body.name || !request.body.number) {
    return response.status(400).json({
      error: 'Name or number missing',
    });
  }

  const newContact = new Person({
    name: request.body.name,
    number: request.body.number,
  });

  newContact
    .save(newContact)
    .then((contact) => response.json(contact).end())
    .catch((error) => next(error));
});

app.put('/api/persons/:id', async (request, response, next) => {
  const { id } = request.params;
  const { name, number } = request.body;

  try {
    const contact = await Person.findByIdAndUpdate(
      id,
      { name, number },
      { new: true, runValidators: true, context: 'query' },
    );
    if (contact) {
      console.log(`Successfully updated contact: { name: ${contact.name}, number: ${contact.number} }`);
      response.json(contact);
    } else response.status(404).json({ error: 'Contact not found' });
  } catch (error) {
    next(error);
  }
});

function handleError(error, request, response, next) {
  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id ' });
  } else if (error.name === 'ValidationError') {
    if (error.errors.name) {
      response.status(400).send({ error: 'Error: Name must be 3 or more characters long' });
    } else if (error.errors.number) {
      response.status(400).send({ error: 'Error: Number must have the format XXX-XXX-XXXX and be at least 8 characters long' });
    }
    response.status(400).send({ error: error.message });
  }

  next(error);
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(handleError);
