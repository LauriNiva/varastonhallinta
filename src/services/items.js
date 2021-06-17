import axios from 'axios';

const baseURL = 'http://localhost:3001/api/items';

let config = null;

const setToken = newToken => {
  config = {
    headers: {Authorization: `bearer ${newToken}` },
  };
};


//get all items of user with a user ID

const getUserItems = (id) => {
  const request = axios.get(`${baseURL}/user/${id}`, config);
  return request.then(res => res.data);
};

const createNewItem = (newItem) => {
  const request = axios.post(`${baseURL}`, newItem, config);
  return request.then(res => res.data);
}

const deleteItem = (id) => {
  const request = axios.delete(`${baseURL}/${id}`, config);
  return request.then(res => res.data);

}

const itemsService = { setToken, getUserItems, createNewItem, deleteItem };

export default itemsService;