const BlogForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form">
        <div className="form-field">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" required />
        </div>
        <div className="form-field">
          <label htmlFor="author">Author</label>
          <input type="text" id="author" required />
        </div>
        <div className="form-field">
          <label htmlFor="url">URL</label>
          <input type="text" id="url" required />
        </div>
      </div>
      <button className="submit-btn" type="submit">Create</button>
    </form>
  )
}

export default BlogForm