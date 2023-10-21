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

  const handleSearch = (event) => {
    setPersonsDisplay(persons.filter((personObj) => {
      const personName = personObj.name.toLowerCase()
      const searchValue = event.target.value.toLowerCase();
      return personName.includes(searchValue);
    })
  )}

  const personExists = (newPersonObj) => {
    return persons.some(personObj => JSON.stringify(personObj) === JSON.stringify(newPersonObj))
  }

  const createNewPersonObj = () => {
    return {
      name: newName,
      number: newNumber
    }
  }

  const handleFormSubmit = (event) => {
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

  const handleNewName = (event) => setNewName(event.target.value)

  const handleNewNumber = (event) => setNewNumber(event.target.value);
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Search onSearchChange={handleSearch}/>
      <h2>Add a new</h2>
      <PersonForm 
        onFormSubmit={handleFormSubmit}
        handleNewName={handleNewName}
        newName={newName}
        handleNewNumber={handleNewNumber}
        newNumber={newNumber}
      />
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

const PersonForm = ({ onFormSubmit, handleNewName, newName, handleNewNumber, newNumber }) => {
  return (
    <form onSubmit={onFormSubmit}>
      <FormField formLabel={'Name'} handleInputChange={handleNewName} value={newName}/>
      <FormField formLabel={'Number:'} handleInputChange={handleNewNumber} value={newNumber}/>
      <button type="submit">add</button>
    </form>
  )
}

const FormField = ({ formLabel, handleInputChange, value }) => {
  return (
    <div>
      {formLabel} <input onChange={handleInputChange} value={value} required/>
    </div>
  )
}

const Search = ({onSearchChange}) => {
  return (
    <>
      {'Search'}<input type="text" onChange={onSearchChange} />
    </>
  )
}

export default App