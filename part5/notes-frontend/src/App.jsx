import { useState, useEffect, useRef } from 'react'
import noteService from './services/notes'
import loginService from './services/login'
import Footer from './components/Footer'
import Note from './components/Note'
import Notification from './components/ErrorNotification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(allNotes => setNotes(allNotes))
  }, [])

  useEffect(() => {
    const existingUser = window.localStorage.getItem('currUser')
    if (existingUser) {
      const user = JSON.parse(existingUser)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const noteFormRef = useRef()

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes([...notes, returnedNote])
      })
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
      console.log(error)
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
        }, 5000)
        setNotes(notes.filter(note => note.id !== id))
      })
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='Login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={(e) => setUsername(e.target.value)}
          handlePasswordChange={(e) => setPassword(e.target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const noteForm = () => {
    return (
      <Togglable buttonLabel={'New note'} ref={noteFormRef}>
        <NoteForm
          createNote={addNote}
        />
      </Togglable>
    )
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      { loginForm() }

      {
        user &&
      <div>
        <p>{user.name} logged in!</p>

      </div>
      }
      { noteForm() }
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