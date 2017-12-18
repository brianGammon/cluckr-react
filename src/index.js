import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css';
import { Provider } from 'react-redux';
import createStore from './store';
import './index.css';
import App from './components/App/App';
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
  module.hot.accept('./components/App/App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./components/App/App').default;
    ReactDOM.render(
      <Provider store={store}>
        <NextApp />
      </Provider>,
      document.getElementById('root'),
    );
  });
}

registerServiceWorker().then(() => store.dispatch({ type: C.UPDATE_AVAILABLE }));
