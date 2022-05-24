import axios from 'axios';

const url = 'http://localhost:2000/posts';

export const fetchPosts = () => axios.get(url);
export const createPosts = (newPosts) => axios.post(url, newPosts);
export const updatePosts = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePosts = (id) => axios.delete(`${url}/${id}`);
export const likePosts = (id) => axios.patch(`${url}/${id}/likePost`);
