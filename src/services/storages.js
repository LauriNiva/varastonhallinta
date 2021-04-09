import axios from 'axios';

const baseURL = 'http://localhost:3001/api/storages/user';

const getStorages = (id) => {
  const request = axios.get(`${baseURL}/${id}`);
  return request.then(res => res.data);
}

export default getStorages;