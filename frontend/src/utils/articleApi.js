// src/utils/articleApi.js
import axios from 'axios';

export const getAllArticles = async () => {
  try {
    const response = await axios.get('http://localhost:5000/article/getall');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch articles');
  }
};

export const getArticleById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/article/getbyid/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch article');
  }
};
