import axios from 'axios';

const API_URL = 'http://localhost:5000/api/documents';

const getAll = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const get = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const save = async (id, content) => {
  await axios.put(`${API_URL}/${id}`, content);
};

export default {
  getAll,
  get,
  save
};