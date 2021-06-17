import axios from 'axios';

const baseURL = 'http://localhost:3001/api/categories';

let config = null;

const setToken = newToken => {
  config = {
    headers: {Authorization: `bearer ${newToken}` },
  };
};

const getCategories = (id) => {
  const request = axios.get(`${baseURL}/user/${id}`, config);
  return request.then(res => res.data);
}

const createNewCategory = (newCategory) => {
  const request = axios.post(`${baseURL}/single`, newCategory, config);
  return request.then(res => res.data);
}

const deleteCategory  = (categoreyId) => {
  const request = axios.delete(`${baseURL}/single/${categoreyId}`, config);
  return request.then(res => res.data);
}


const categoriesService = { setToken, getCategories, createNewCategory, deleteCategory };

export default categoriesService;