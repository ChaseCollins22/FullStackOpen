import axios from 'axios'

const BASE_URL = '/api/login'

const sendLogin = async (credentials) => {
  const response = await axios.post(BASE_URL, credentials)
  return response.data
}

export default { sendLogin }

