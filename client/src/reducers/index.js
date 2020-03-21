import { combineReducers } from 'redux';
import authReducer from './authReducer';
import urlReducer from './urlReducer';

export default combineReducers({
  auth: authReducer,
  url: urlReducer
});
