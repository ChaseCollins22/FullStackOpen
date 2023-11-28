import axios from 'axios';

const BASE_URL = '/api/login';

const login = async (credentials) => {
  const user = await axios.post(BASE_URL, credentials);
  return user.data;
};

export default { login };
