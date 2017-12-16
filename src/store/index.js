import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import userSettings from '../reducers/userSettingsReducer';
import chickens from '../reducers/chickensReducer';
import eggs from '../reducers/eggsReducer';
import flocks from '../reducers/flocksReducer';
import auth from '../reducers/authReducer';
import dbRefs from '../reducers/dbRefsReducer';
import dataLoading from '../reducers/dataLoadingReducer';
import appUpdate from '../reducers/appUpdateReducer';

const initialState = undefined;

export default () => {
  let store;

  // TODO: look at adding in dev tools middleware
  if (module.hot) {
    store = createStore(
      combineReducers({
        userSettings,
        chickens,
        eggs,
        flocks,
        auth,
        dbRefs,
        dataLoading,
        appUpdate,
        form: formReducer,
      }), applyMiddleware(thunk),
      initialState,
    );
  } else {
    store = createStore(
      combineReducers({
        userSettings,
        chickens,
        eggs,
        flocks,
        auth,
        dbRefs,
        dataLoading,
        appUpdate,
        form: formReducer,
      }), applyMiddleware(thunk),
      initialState,
    );
  }

  return store;
};
