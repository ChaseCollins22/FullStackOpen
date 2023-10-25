import { useState, useEffect } from 'react'
import people from './services/people'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [personsDisplay, setPersonsDisplay] = useState(persons);
 
  useEffect(() => {
    people
      .getAllContacts()
      .then(allContacts => {
        setPersons(allContacts)
        setPersonsDisplay(allContacts)
      })
    }, []);

  const getContactByNumber = (number) => {
    return persons.find(person => person.number === number)
  }

  const handleDelete = (event) => {
    const contact = getContactByNumber(event.target.id)
    if (window.confirm(`Delete ${contact.name}?`)) {
      people
        .deleteContact(contact.id)
        .then(_ => {
          people
            .getAllContacts()
            .then(allContacts => {
              setPersons(allContacts)
              setPersonsDisplay(allContacts)
          })
        })
    }    
  }

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
      number: newNumber,
    }
  }

  const nameExists = () => persons.some(personObj => personObj.name === newName);

  const handleNameExists = () => {
    const windowMessage = `${newName} is already added to phonebook. Replace the old number with a new one?`;
    if (window.confirm(windowMessage)) {
      const personObj = getContactByName();
      const updatedPersonObj = { ...personObj, number: newNumber}
  
      people
        .updateContact(personObj.id, updatedPersonObj)
        .then(updatedContact => {
          const updatedContacts = persons.map(person => person.id === personObj.id ? updatedContact : person)
          setPersonsDisplay(updatedContacts)
          setPersons(updatedContacts)
        })
    }
  }

  const getContactByName = () => persons.find(personObj => personObj.name === newName)
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newContactObj = createNewPersonObj();
    
    if (personExists(newContactObj)) alert(`${newName} is already added to the phonebook`)
    else if (nameExists()) handleNameExists()
    else {
      people
        .createContact(newContactObj)
        .then(newContact => {
          setPersons([...persons, newContact])
          setPersonsDisplay([...persons, newContact])
        })
      }
    setNewName('')
    setNewNumber('')
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
      <PersonsList personsList={personsDisplay} onDeleteClick={handleDelete} />
    </div>
  )
}

const Person = ({ name, number }) => {
  return <span>{name} {number}</span>
}

const DeleteButton = ({ contactKey, handleDelete }) => {
  return (
    <button 
      type='button' 
      style={{marginLeft: '.75em'}}
      onClick={handleDelete}
      id={contactKey} 
    >
      Delete
    </button>
  )
}

const PersonsList = ({ personsList, onDeleteClick }) => {
  return personsList.map(person =>
    <div key={person.number} style={{padding: '.5em'}}>
      <Person
        key={person.number}
        name={person.name}
        number={person.number}
      />
      <DeleteButton contactKey={person.number} handleDelete={onDeleteClick} />
    </div>
   )
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