import axios from 'axios';

const baseURL = 'http://localhost:3001/api/items';

//get all items of user with a user ID

const getUserItems = (id) => {
  const request = axios.get(`${baseURL}/user/${id}`);
  return request.then(res => res.data);
};

const createNewItem = (newItem) => {
  const request = axios.post(`${baseURL}/single/`, newItem);
  return request.then(res => res.data);
}

const deleteItem = (id) => {
  const request = axios.delete(`${baseURL}/single/${id}`);
  return request.then(res => res.data);

}

const itemsService = { getUserItems, createNewItem, deleteItem };

export default itemsService;