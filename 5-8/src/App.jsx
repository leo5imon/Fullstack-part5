import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [newAuthor, setNewAuthor] = useState('')
  const [newLikes, setNewLikes] = useState('')
  const [newURL, setNewURL] = useState('')
  const [user, setUser] = useState(null) 
  const [blogVisible, setBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])
  
  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      likes: newLikes,
      url: newURL    
    }

    blogService
      .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setNewTitle('')
          setNewAuthor('')
          setNewLikes('')
          setNewURL('')
        })
      .catch(error => {
        setErrorMessage(
          `Blog can't be published`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  }}
  
  const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
  }

  const logout = () => {
    window.localStorage.clear()
    window.location.reload(false)
  }

  if (user === null) {
    return (
      <>
        <h1>Log-in</h1>

        <Notification message={errorMessage} />

        <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>    
    )
  }

  return (
    <div>
      <p>{user.name} connected</p>
      <button onClick={logout}>logout</button>
      <Togglable buttonLabel='blog'>
        <BlogForm 
          handleTitleChange={({ target }) => setNewTitle(target.value)}
          handleAuthorChange={({ target }) => setNewAuthor(target.value)}
          handleLikesChange={({ target }) => setNewLikes(target.value)}
          handleURLChange={({ target }) => setNewURL(target.value)}
          handleSubmit={addBlog}
        />
      </Togglable>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <div style={blogStyle} key={blog.id}>{blog.title}
          <Togglable buttonLabel='view'>
            <Blog key={blog.id} blog={blog} />
          </Togglable>
        </div>
      )}
    </div>
  )
}

export default App