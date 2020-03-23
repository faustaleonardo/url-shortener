import { combineReducers } from 'redux';
import authReducer from './authReducer';
import urlReducer from './urlReducer';
import errorReducer from './errorReducer';
import historyReducer from './historyReducer';
import trackReducer from './trackReducer';
import statsReducer from './statsReducer';

export default combineReducers({
  auth: authReducer,
  url: urlReducer,
  history: historyReducer,
  track: trackReducer,
  stats: statsReducer,
  error: errorReducer
});
