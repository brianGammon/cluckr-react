import { C } from '../config/constants';

const initialState = {
  authStatus: C.UNKNOWN,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case C.LOGGING_IN:
      return Object.assign({}, state, {
        uid: action.user.uid,
        email: action.user.email,
      });
    case C.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        authStatus: C.LOGGED_IN,
      });
    case C.LOGOUT:
      return {
        authStatus: C.LOGGED_OUT,
      };
    default:
      return state;
  }
};

export default authReducer;
