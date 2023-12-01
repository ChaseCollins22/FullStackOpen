import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import Blog from './Blog';

test('<Blog /> renders title and author only, by default', async () => {
  const blog = {
    title: 'This is a test blog',
    author: 'The testing author',
    url: 'testing.com',
    likes: 103,
  };

  const blogContainer = render(<Blog blog={blog} />).container;

  const title = screen.getByText('This is a test blog', { exact: false });
  const url = screen.queryByText('testing.com');
  const likes = screen.queryByText('103');
  const author = screen.getByText('The testing author', { exact: false });

  expect(title.innerHTML).toContain('This is a test blog');
  expect(url).toBeNull();
  expect(likes).toBeNull();
  expect(author.innerHTML).toContain('The testing author');
});

test('<Blog /> renders all data after clicking the view button', async () => {
  const blog = {
    title: 'This is a test blog',
    author: 'The testing author',
    url: 'testing.com',
    likes: 103,
    user: {
      id: 100,
    },
  };

  const blogContainer = render(<Blog blog={blog} userId={100} />).container;
  const viewBlogBtn = blogContainer.getElementsByClassName('view-blog-btn');

  fireEvent.click(viewBlogBtn[0]);

  const likes = screen.getByTestId('likes');
  const url = screen.getByTestId('url');

  expect(likes.innerHTML).toBe('Likes:103');
  expect(url.innerHTML).toBe('URL:testing.com');
});

test('Clicking the like button works', async () => {
  const blog = {
    title: 'This is a test blog',
    author: 'The testing author',
    url: 'testing.com',
    likes: 103,
    user: {
      id: 100,
    },
  };

  const mockEventHandler = jest.fn();

  const blogContainer = render(
    <Blog
      blog={blog}
      userId={100}
      updateBlog={mockEventHandler}
    />,
  ).container;

  const viewBlogBtn = blogContainer.getElementsByClassName('view-blog-btn');

  fireEvent.click(viewBlogBtn[0]);

  const likeBtn = await screen.findByText('Like');

  expect(mockEventHandler.mock.calls).toHaveLength(0);

  fireEvent.click(likeBtn);

  expect(mockEventHandler.mock.calls).toHaveLength(1);

  const likes = screen.getByTestId('likes');
  expect(likes.innerHTML).toContain('104');

  fireEvent.click(likeBtn);

  expect(mockEventHandler.mock.calls).toHaveLength(2);
  expect(likes.innerHTML).toContain('105');
});
