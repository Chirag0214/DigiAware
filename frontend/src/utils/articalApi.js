// src/utils/articalApi.js
import axios from 'axios';

export const getAllArticals = async () => {
  try {
    const response = await axios.get('http://localhost:5000/artical/getall');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch articles');
  }
};
