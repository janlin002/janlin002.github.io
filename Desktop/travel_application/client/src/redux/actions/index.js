import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from '../actionType';

import * as api from '../../api/index';

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (newPosts) => async (dispatch) => {
  try {
    const { data } = await api.createPosts(newPosts);

    dispatch({ type: CREATE, payload: data });
  } catch (err) {
    console.error(err);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePosts(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (err) {
    console.error(err);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePosts(id);

    dispatch({ type: DELETE, payload: id });
  } catch (err) {
    console.error(err);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePosts(id);

    dispatch({ type: LIKE, payload: data });
  } catch (err) {
    console.error(err);
  }
};
