import axios from 'axios';

const baseURL = 'http://localhost:3001/api/storages';

//get all storages of use with a user ID

const getStorages = (id) => {
  const request = axios.get(`${baseURL}/user/${id}`);
  return request.then(res => res.data);
};

const updateStorageStock = (id, itemId, change) => {
  const request = axios.put(`${baseURL}/${id}/${itemId}/${change}`);
  return request.then(res => res.data);
};

const createNewStorage = (newStorage) => {
  const request = axios.post(`${baseURL}/single`, newStorage);
  return request.then(res => res.data);
};

const deleteStorage = (storageId) => {
  const request = axios.delete(`${baseURL}/${storageId}`);
  return request.then(res => res.data);
};

const addItemsToStorage = (storageId, arrayOfItemsToAdd) => {
  const request = axios.post(`${baseURL}/${storageId}`, arrayOfItemsToAdd);
  return request.then(res => res.data);
};

const deleteItemFromStorage = (storageId, itemId) => {
  const request = axios.delete(`${baseURL}/${storageId}/${itemId}`);
};


const storagesService = { getStorages, updateStorageStock, createNewStorage, deleteStorage, addItemsToStorage };

export default storagesService;