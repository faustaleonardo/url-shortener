import axios from 'axios';
import {
  FETCH_USER,
  LOGIN,
  SIGNUP,
  POST_URL,
  GET_ERROR,
  CLEAR_ERROR
} from './types';

/** Authentication */
const postUser = (url, data, type) => async dispatch => {
  try {
    let user = '';

    const response = await axios.post(url, data);
    if (response.data.status === 'success') user = response.data.data.user;

    dispatch({ type, payload: user });
  } catch (err) {
    dispatch({ type: GET_ERROR, payload: err.response.data.message });
  }
};

export const fetchUser = () => async dispatch => {
  const response = await axios.get('/api/auth/user');
  dispatch({ type: FETCH_USER, payload: response.data });
};

export const login = data => postUser('/api/auth/login', data, LOGIN);

export const signup = data => postUser('/api/auth/signup', data, SIGNUP);

/** URL */
export const postUrl = data => async dispatch => {
  try {
    const response = await axios.post('api/', data);

    dispatch({ type: POST_URL, payload: response.data.data.item });
  } catch (err) {
    dispatch({ type: GET_ERROR, payload: err.response.data.message });
  }
};

/** Error */
export const clearError = () => {
  return { type: CLEAR_ERROR, payload: null };
};
