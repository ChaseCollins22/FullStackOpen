import { render, screen, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('Create blog api call works successfully', async () => {
  const mockEventHandler = jest.fn()
  const user = userEvent.setup()

  const blogForm = render(<BlogForm createBlog={mockEventHandler} />).container

  const titleInput = blogForm.querySelector('#title')
  const authorInput =  blogForm.querySelector('#author')
  const urlInput = blogForm.querySelector('#url')
  
  await user.type(titleInput, 'This is the test blog title')
  await user.type(authorInput, 'Test blog author here')
  await user.type(urlInput, 'testingurl.com')

  const submitBtn = blogForm.querySelector('.submit-btn')
  fireEvent.submit(submitBtn, {
    target: [
      { value: 'This is the test blog title' },
      { value: 'Test blog author here' },
      { value: 'testingurl.com' },
    ],
  });


 expect(mockEventHandler.mock.calls).toHaveLength(1)
 expect(mockEventHandler.mock.calls[0][1]).toEqual({
    title: 'This is the test blog title',
    author: 'Test blog author here',
    url: 'testingurl.com'
  })
});




