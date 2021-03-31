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
  logout: () => axios.get(`${baseUrl}/auth/logout`, { withCredentials: true }),
};

export const postAPI = {
  createPost: (postFormData) =>
    axios.post(`${baseUrl}/api/posts`, postFormData, { withCredentials: true }),
  getPostsByLocation: (locationId) =>
    axios.get(`${baseUrl}/api/posts/location/${locationId}`, {
      withCredentials: true,
    }),
  getPostById: (postId) =>
    axios.get(`${baseUrl}/api/posts/${postId}`, {
      withCredentials: true,
    }),
};
