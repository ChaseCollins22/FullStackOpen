import axios from 'axios'
const baseUrl = '/api/blogs'

let token = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')).token : null


const setToken = (userToken) => token = userToken

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (newBlog) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const request = await axios.post(baseUrl, newBlog, config)
  return request.data
}

export default { getAll, createBlog, setToken }