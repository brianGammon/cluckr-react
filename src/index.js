import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bulma/css/bulma.css';
import './index.css';

import createStore from './store';
import App from './containers/App';
import { C } from './config/constants';
import registerServiceWorker from './registerServiceWorker';

const store = createStore();

ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ), document.getElementById('root'),
);

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept('./containers/App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./containers/App').default;
    ReactDOM.render(
      <Provider store={store}>
        <NextApp />
      </Provider>,
      document.getElementById('root'),
    );
  });
}

registerServiceWorker().then(() => store.dispatch({ type: C.UPDATE_AVAILABLE }));
