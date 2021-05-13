import axios from 'axios';

const baseURL = 'http://localhost:3001/api/categories';

const getCategories = (id) => {
  const request = axios.get(`${baseURL}/user/${id}`);
  return request.then(res => res.data);
}

const createNewCategory = (newCategory) => {
  const request = axios.post(`${baseURL}/single`, newCategory);
  return request.then(res => res.data);
}

const deleteCategory  = (categoreyId) => {
  const request = axios.delete(`${baseURL}/single/${categoreyId}`);
  return request.then(res => res.data);
}


const categoriesService = { getCategories, createNewCategory, deleteCategory };

export default categoriesService;