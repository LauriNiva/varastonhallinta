import axios from 'axios';

const baseURL = 'http://localhost:3001/api/items';

//get all items of user with a user ID

const getUserItems = (id) => {
  const request = axios.get(`${baseURL}/user/${id}`);
  return request.then(res => res.data);
};

const itemsService = { getUserItems };

export default itemsService;