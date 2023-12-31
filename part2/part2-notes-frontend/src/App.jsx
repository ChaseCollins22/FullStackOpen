import { useState, useEffect } from 'react'
import noteService from './services/notes'
import loginService from './services/login'
import Footer from './components/Footer'
import Note from './components/Note'
import Notification from './components/ErrorNotification'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(allNotes => setNotes(allNotes))
  }, []);

  useEffect(() => {
    const existingUser = window.localStorage.getItem('currUser')
    if (existingUser) {
      const user = JSON.parse(existingUser)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

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

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.sendLogin({ username, password })
      setUsername('')
      setPassword('')
      setUser(user)
      window.localStorage.setItem('currUser', JSON.stringify(user))
      noteService.setToken(user.token)
    } catch (error) {
      setErrorMessage('Invalid Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input 
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input 
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    )
  }

  const newNoteForm = () => {
    return (
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    )
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {
      user 
      ? <div>
        <p>{user.name} logged in!</p>
        {newNoteForm()}
      </div>
      : loginForm()
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      <Footer />
    </div>
  )
}

export default App