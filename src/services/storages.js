import axios from 'axios';

const baseURL = 'http://localhost:3001/api/storages';

//get all storages of use with a user ID

const getStorages = (id) => {
  const request = axios.get(`${baseURL}/user/${id}`);
  return request.then(res => res.data);
};

const updateStorageStock = (storageId, itemIndex, newStock) => {
  const info = {itemIndex, newStock};
  const request = axios.put(`${baseURL}/stock/${storageId}`, info);
  return request.then(res => res.data);
};

const storagesService = { getStorages, updateStorageStock };

export default storagesService;