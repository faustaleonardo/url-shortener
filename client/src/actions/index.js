import axios from 'axios';
import {
  FETCH_USER,
  LOGIN,
  SIGNUP,
  GET_URL,
  GET_HISTORY,
  GET_TRACK,
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
    const response = await axios.post('/api/', data);

    dispatch({ type: GET_URL, payload: response.data.data.item });
  } catch (err) {
    dispatch({ type: GET_ERROR, payload: err.response.data.message });
  }
};

export const patchUrl = (urlId, data) => async dispatch => {
  try {
    const response = await axios.patch(`/api/${urlId}`, data);

    dispatch({ type: GET_URL, payload: response.data.data.item });
  } catch (err) {
    dispatch({ type: GET_ERROR, payload: err.response.data.message });
  }
};

export const getHistory = () => async dispatch => {
  const response = await axios.get('/api/history');
  dispatch({ type: GET_HISTORY, payload: response.data.data.shorturls });
};

export const getTrack = urlId => async dispatch => {
  const response = await axios.get(`/api/tracks/${urlId}`);
  dispatch({ type: GET_TRACK, payload: response.data.data.tracks });
};

/** Error */
export const clearError = () => {
  return { type: CLEAR_ERROR, payload: null };
};
