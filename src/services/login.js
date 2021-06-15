import axios from 'axios';
const baseURL = 'http://localhost:3001/api/login';

const login = async credentials => {
  const res = await axios.post(baseURL, credentials);
  return res.data;
};

const loginService = { login };

export default loginService;