const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide DB password');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://chasecollins1954:${password}@notesapp.cb1y31v.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  Person
    .find({})
    .then((result) => {
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    });
  console.log('Phonebook:');
} else if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  const newPerson = new Person({ name, number });

  newPerson
    .save()
    .then(() => {
      console.log(`Added name: ${newPerson.name} number: ${newPerson.number} to phonebook`);
      mongoose.connection.close();
    });
}
