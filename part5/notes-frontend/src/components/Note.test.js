import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const { container } = render(<Note note={note} />)

  const renderedNote = screen.getByTestId('note-test')

  screen.debug()

  expect(renderedNote).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})