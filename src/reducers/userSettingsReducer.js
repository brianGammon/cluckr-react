import { C } from '../config/constants';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case C.USER_SETTINGS: {
      return action.payload;
    }
    case C.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};
