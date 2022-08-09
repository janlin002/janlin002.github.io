import axios from 'axios';

const url = 'http://localhost:2000/posts';

const API = axios.create({ baseURL: 'https://travel-application-test.herokuapp.com/' }); // 預設值

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPosts = () => API.get(url);
export const createPosts = (newPosts) => API.post(url, newPosts);
export const updatePosts = (id, updatedPost) => API.patch(`${url}/${id}`, updatedPost);
export const deletePosts = (id) => API.delete(`${url}/${id}`);
export const likePosts = (id) => API.patch(`${url}/${id}/likePost`);

// 登出入
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
