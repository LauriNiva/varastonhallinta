import axios from 'axios';

const baseURL = 'http://localhost:3001/api/users';

const getUser = (name) => {
  const request = axios.get(`${baseURL}/${name}`);
  return request.then(res => res.data);
}

const addUserItem = (id, itemId) => {
  const request = axios.put(`${baseURL}/items/${id}`, itemId);
  return request.then(res => res.data);
}

const deleteUserItem = (id, itemId) => {
  const request = axios.delete(`${baseURL}/items/${id}/${itemId}`);
  return request;
}

const addUserStorage = (id, storageId) => {
  const request = axios.put(`${baseURL}/storages/${id}`, storageId);
  return request.then(res => res.data);
}

const deleteUserStorage = (id, storageId) => {
  const request = axios.delete(`${baseURL}/storages/${id}/${storageId}`);
  return request;
}

const addUserCategory = (id, categoryId) => {
  const request = axios.put(`${baseURL}/categories/${id}`, categoryId);
  return request.then(res => res.data);
};

const deleteUserCategory = (id, categoryId) => {
  const request = axios.delete(`${baseURL}/categories/${id}/${categoryId}`);
  return request;
}


const usersService = { getUser, addUserItem, deleteUserItem, addUserStorage, deleteUserStorage, addUserCategory, deleteUserCategory };

export default usersService;