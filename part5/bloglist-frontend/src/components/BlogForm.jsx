const BlogForm = ({ handleSubmit, handleFormDisplay, displayForm, handleCreateBtn }) => {
  const displayFormStyle = { display: displayForm ? '' : 'none' }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form" style={displayFormStyle}>
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
      <button className="submit-btn" type="submit" onClick={handleCreateBtn}>Create</button>
      <button type="button" style={displayFormStyle} onClick={handleFormDisplay}>Cancel</button>
    </form>
  )
}

export default BlogForm