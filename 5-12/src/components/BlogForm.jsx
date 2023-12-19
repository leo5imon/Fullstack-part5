const BlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleLikesChange,
  handleURLChange,
  title,
  author,
  likes,
  url
}) => {
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>title<input value={title} onChange={handleTitleChange} name="title"/></div>
        <div>author<input value={author} onChange={handleAuthorChange} name="author"/></div>
        <div>likes<input value={likes} onChange={handleLikesChange} name="likes"/></div>
        <div>url<input value={url} onChange={handleURLChange} name="url"/></div>
        <button type="submit">save</button>
      </form>
    </>
  )
}

export default BlogForm