import { useState, useEffect } from 'react'
import noteService from './services/notes'
import Footer from './components/Footer'
import Note from './components/Note'
import Notification from './components/ErrorNotification'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState('some error happened :( ...');

  useEffect(() => {
    noteService
      .getAll()
      .then(allNotes => setNotes(allNotes))
  }, []);

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
  
    noteService
      .create(noteObject)
      .then(createdNote => {
        setNotes([...notes, createdNote])
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find((note) => note.id === id)
    const modifiedNote = { ...note, important: !note.important }

    noteService
      .update(id, modifiedNote)
      .then(updatedNote => {
        setNotes(notes.map(note => 
          note.id === id
          ? updatedNote
          : note
        ))
      })
      .catch(error => {
        setErrorMessage(`The note, '${note.content}' has already been removed from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>      
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
      <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App