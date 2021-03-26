import axios from 'axios';

const baseUrl = 'http://localhost:5000';

export const userAPI = {
  signup: (newUserData) =>
    axios.post(`${baseUrl}/auth/signup`, newUserData, {
      withCredentials: true,
    }),
  login: (loginUserData) =>
    axios.post(`${baseUrl}/auth/login`, loginUserData, {
      withCredentials: true,
    }),
  getCurrentUser: () =>
    axios.get(`${baseUrl}/auth/currentuser`, { withCredentials: true }),
};

export const postAPI = {
  createPost: (postFormData) =>
    axios.post(`${baseUrl}/api/posts`, postFormData, { withCredentials: true }),
};
