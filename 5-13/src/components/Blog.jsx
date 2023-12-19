const Blog = ({ blog, updateLikes }) => {

  const handleButtonClick = () => {
    updateLikes(blog)
  }

  return (
    <>
      <div>{blog.author}</div>
      <div>{blog.likes}<button onClick={handleButtonClick}>like</button></div>
      <div>{blog.url}</div>
      <button>remove</button>
    </>
  )
}

export default Blog