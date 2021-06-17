import axios from 'axios';

const baseURL = 'http://localhost:3001/api/storages';

let config = null;

const setToken = newToken => {
  config = {
    headers: {Authorization: `bearer ${newToken}` },
  };
};

//get all storages of use with a user ID

const getStorages = (id) => {
  const request = axios.get(`${baseURL}/user/${id}`, config);
  return request.then(res => res.data);
};

const updateStorageStock = (id, itemId, change) => {
  const request = axios.put(`${baseURL}/${id}/${itemId}/${change}`,{}, config);
  return request.then(res => res.data);
};

const createNewStorage = (newStorage) => {
  const request = axios.post(`${baseURL}`, newStorage, config);
  return request.then(res => res.data);
};

const deleteStorage = (storageId) => {
  const request = axios.delete(`${baseURL}/${storageId}`, config);
  return request.then(res => res.data);
};

const addItemsToStorage = (storageId, arrayOfItemsToAdd) => {
  const request = axios.post(`${baseURL}/${storageId}`, arrayOfItemsToAdd, config);
  return request.then(res => res.data);
};

const deleteItemFromStorage = (storageId, itemId) => {
  const request = axios.delete(`${baseURL}/${storageId}/${itemId}`, config);
  return request.then(res => res.data);
};


const storagesService = { setToken, getStorages, updateStorageStock, createNewStorage, deleteStorage, addItemsToStorage, deleteItemFromStorage };

export default storagesService;