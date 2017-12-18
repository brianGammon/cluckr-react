import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userSettings from '../reducers/userSettingsReducer';
import chickens from '../reducers/chickensReducer';
import eggs from '../reducers/eggsReducer';
import flocks from '../reducers/flocksReducer';
import auth from '../reducers/authReducer';
import dbRefs from '../reducers/dbRefsReducer';
import dataLoading from '../reducers/dataLoadingReducer';
import appUpdate from '../reducers/appUpdateReducer';

const rootReducer = combineReducers({
  userSettings,
  chickens,
  eggs,
  flocks,
  auth,
  dbRefs,
  dataLoading,
  appUpdate,
  form: formReducer,
});

export default rootReducer;
