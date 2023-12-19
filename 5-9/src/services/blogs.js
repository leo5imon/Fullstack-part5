import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  try {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const update = (id, newObject) => {
  try {
    const config = {
      headers: { Authorization: token },
    }
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
  } catch (error) {
    console.log(error)
  }
}

export default { getAll, create, update, setToken }