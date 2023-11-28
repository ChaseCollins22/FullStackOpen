import { useState } from 'react';

function BlogForm({ createBlog }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (e) => {
    createBlog(e);

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={addBlog}>
      <div className="form">
        <div className="form-field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="url">URL</label>
          <input
            type="text"
            id="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
      </div>
      <button className="submit-btn" type="submit">Create new blog</button>
    </form>
  );
}

export default BlogForm;
