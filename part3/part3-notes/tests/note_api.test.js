const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Note = require('../models/note')
const helper = require('./test_helper')


beforeEach(async () => {
  await Note.deleteMany({})
  await Note.insertMany(helper.initialNotes)
})

describe('When there are initally some notes saved', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(helper.initialNotes.length)
  })

  test('A specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')
    const contents = response.body.map(res => res.content)
    expect(contents).toContain('Browser can execute only JavaScript')
  })
})

describe('When adding a new note', () => {
  test('Adding a new note is successful', async () => {
    const newNote = {
      content: 'This is the newest note EVER!',
      important: false
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const allNotes = await helper.notesInDb()
    expect(allNotes).toHaveLength(helper.initialNotes.length + 1)

    const contents = allNotes.map(note => note.content)
    expect(contents).toContain('This is the newest note EVER!')
  })

  test('Adding a new note without content is unsuccessful', async () => {
    const newNote = {}

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const allNotes = await helper.notesInDb()
    expect(allNotes).toHaveLength(helper.initialNotes.length)
  })
})

describe('When accessing a note by ID', () => {
  test('Deleting a note by ID is successful', async () => {
    const initialNotes = await helper.notesInDb()

    const noteToDelete = initialNotes[0]

    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204)

    const notesAfterDeletion = await helper.notesInDb()
    expect(notesAfterDeletion).toHaveLength(initialNotes.length - 1)

    const contents = notesAfterDeletion.map(res => res.content)
    expect(contents).not.toContain(noteToDelete.content)
  })

  test('Fetching a note by ID is successful', async () => {
    const initialNotes = await helper.notesInDb()

    const testNote = initialNotes[0]

    const testNoteFromDB = await api
      .get(`/api/notes/${testNote.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(testNoteFromDB.body).toEqual(testNote)
  })
})



afterAll(async () => {
  await mongoose.connection.close()
})