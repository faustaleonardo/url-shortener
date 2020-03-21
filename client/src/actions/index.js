import instance from '../utils/axios';
import { LOGIN, REGISTER, LOGOUT } from './types';

export const login = (username, password) => async dispatch => {
  const response = await instance.post('/auth/login', { username, password });

  localStorage.setItem('JWT', response.data);

  dispatch({ type: LOGIN, payload: response.data });
};
