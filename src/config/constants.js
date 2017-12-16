import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: `${process.env.REACT_APP_PROJ_NAME}.firebaseapp.com`,
  databaseURL: `https://${process.env.REACT_APP_PROJ_NAME}.firebaseio.com`,
  projectId: process.env.REACT_APP_PROJ_NAME,
  storageBucket: `${process.env.REACT_APP_PROJ_NAME}.appspot.com`,
};

firebase.initializeApp(firebaseConfig);
export const firebaseRef = firebase.database().ref();
export const firebaseAuth = firebase.auth();
export const firebaseStorageRef = firebase.storage().ref();

// App version set by pre-build.js
export const appVersion = '0.0.0';

export const C = {
  // Auth actions.
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGOUT: 'LOGOUT',
  LISTENING_TO_AUTH: 'LISTENING_TO_AUTH',

  // Auth states.
  LOGGED_IN: 'LOGGED_IN',
  LOGGING_IN: 'LOGGING_IN',
  LOGGED_OUT: 'LOGGED_OUT',
  UNKNOWN: 'UNKNOWN',

  // Data loading
  DATA_LOADING: 'DATA_LOADING',
  DATA_LOADED: 'DATA_LOADED',

  // User settings actions
  USER_SETTINGS: 'USER_SETTINGS',

  // DB Refs actions
  REF_ON: 'REF_ON',
  REF_OFF: 'REF_OFF',
  REF_ALLOFF: 'REF_ALLOFF',

  // Flocks actions
  FLOCKS_RESET: 'FLOCKS_RESET',
  FLOCK: 'FLOCK',

  // Chickens actions
  CHICKENS: 'CHICKENS',
  CHICKENS_RESET: 'CHICKENS_RESET',

  // Eggs actions
  EGGS: 'EGGS',
  EGGS_RESET: 'EGGS_RESET',
};

export default C;
