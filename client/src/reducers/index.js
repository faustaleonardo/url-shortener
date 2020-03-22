import { combineReducers } from 'redux';
import authReducer from './authReducer';
import urlReducer from './urlReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  url: urlReducer,
  error: errorReducer
});
