import axios from 'axios';

const baseURL = 'http://localhost:3001/api/users';

const getUser = (name) => {
  const request = axios.get(`${baseURL}/${name}`);
  return request.then(res => res.data);
}

const addUserItem = (id, item) => {
  const request = axios.put(`${baseURL}/${id}`, item);
  return request.then(res => res.data);
}

const usersService = { getUser, addUserItem };

export default usersService;