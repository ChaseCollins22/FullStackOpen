import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [personsDisplay, setPersonsDisplay] = useState(persons);

  const createNewPersonObj = () => {
    return {
      name: newName,
      number: newNumber
    }
  }

  const handleSearch = (event) => {
    setPersonsDisplay(persons.filter((personObj) => {
      const personName = personObj.name.toLowerCase()
      const searchValue = event.target.value.toLowerCase();
      return personName.includes(searchValue);
    })
  )}

  const onFormSubmit = (event) => {
    event.preventDefault();
    const newPersonObj = createNewPersonObj();
    
    if (personExists(newPersonObj)) alert(`${newName} is already added to the phonebook`)
    else {
      setPersons([...persons, newPersonObj])
      setPersonsDisplay([...persons, newPersonObj])
      setNewName('')
      setNewNumber('')
    }
  }

  const personExists = (newPersonObj) => {
    return persons.some(personObj => JSON.stringify(personObj) === JSON.stringify(newPersonObj))
  }

  const handleNewName = (event) => setNewName(event.target.value)

  const handleNewNumber = (event) => setNewNumber(event.target.value);
  
  return (
    <div>
      <h2>Phonebook</h2>
      Search <input type="text" onChange={handleSearch} />
      <h2>Add a new</h2>
      <form onSubmit={onFormSubmit}>
        <div>
          Name: <input onChange={handleNewName} value={newName} required/>
        </div>
        <div>
          Number: <input onChange={handleNewNumber} value={newNumber} required/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PersonsList personsList={personsDisplay} />
    </div>
  )
}

const Person = ({ name, number }) => {
  return <p>{name} {number}</p>
}

const PersonsList = ({ personsList }) => {
  return personsList.map(person =>
    <Person
       key={person.number}
       name={person.name}
       number={person.number}
   />)
}

export default App