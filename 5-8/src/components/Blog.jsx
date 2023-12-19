const Blog = ({ blog }) => (
  <>
    <div>{blog.author}</div>
    <div>{blog.likes}<button>like</button></div>
    <div>{blog.url}</div>
  </>
)

export default Blog