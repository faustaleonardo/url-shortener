import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import './index.css';
import App from './components/App';
import reducers from './reducers';

import 'tailwindcss/dist/base.min.css';
import 'tailwindcss/dist/components.min.css';
import 'tailwindcss/dist/utilities.min.css';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
