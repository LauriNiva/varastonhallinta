import axios from 'axios';

const baseURL = 'http://localhost:3001/api/storages';

//get all storages of use with a user ID

const getStorages = (id) => {
  const request = axios.get(`${baseURL}/user/${id}`);
  return request.then(res => res.data);
};

const updateStorageStock = (id, itemId, change) => {
  const request = axios.put(`${baseURL}/stock/${id}/${itemId}/${change}`);
  return request.then(res => res.data);
};

const createNewStorage = (newStorage) => {
  const request = axios.post(`${baseURL}/single`, newStorage);
  return request.then(res => res.data);
};

const deleteStorage = (storageId) => {
  const request = axios.delete(`${baseURL}/single/${storageId}`);
  return request.then(res => res.data);
};

const addItemToStorage = (storageId, newItem) => {
  const request = axios.post(`${baseURL}/${storageId}/items`, newItem);
  return request.then(res => res.data);
};



const storagesService = { getStorages, updateStorageStock, createNewStorage, deleteStorage, addItemToStorage };

export default storagesService;