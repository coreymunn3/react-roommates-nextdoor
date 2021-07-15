import axios from 'axios';

const baseUrl = 'https://roommates-fullstack.herokuapp.com';

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
  updateProfile: (newUserData) =>
    axios.patch(`${baseUrl}/auth/updateprofile`, newUserData, {
      withCredentials: true,
    }),
  searchUsername: (query) =>
    axios.post(
      `${baseUrl}/auth/username`,
      { query },
      { withCredentials: true }
    ),
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
  getPostByUser: () =>
    axios.get(`${baseUrl}/api/posts`, {
      withCredentials: true,
    }),
  editPost: (postId, postFormData) =>
    axios.patch(`${baseUrl}/api/posts/${postId}`, postFormData, {
      withCredentials: true,
    }),
  deletePost: (postId) =>
    axios.delete(`${baseUrl}/api/posts/${postId}`, {
      withCredentials: true,
    }),
  likePost: (postId) =>
    axios.patch(
      `${baseUrl}/api/posts/${postId}/like`,
      {},
      {
        withCredentials: true,
      }
    ),
  unlikePost: (postId) =>
    axios.patch(
      `${baseUrl}/api/posts/${postId}/unlike`,
      {},
      {
        withCredentials: true,
      }
    ),
  searchPosts: (searchTerm) =>
    axios.get(`${baseUrl}/api/posts/search/${searchTerm}`, {
      withCredentials: true,
    }),
  getRandomPost: () =>
    axios.get(`${baseUrl}/api/posts/post/random`, {
      withCredentials: true,
    }),
};

export const locationAPI = {
  getAllLocations: () =>
    axios.get(`${baseUrl}/api/locations`, {
      withCredentials: true,
    }),
};

export const imageAPI = {
  upload: (base64Image) =>
    axios.post(`${baseUrl}/api/images`, base64Image, { withCredentials: true }),
};
