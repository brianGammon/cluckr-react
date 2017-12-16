import { C } from '../config/constants';

const initialState = null;
export default (state = initialState, action) => {
  switch (action.type) {
    case C.EGGS: {
      return action.payload;
    }
    case C.EGGS_RESET: {
      return initialState;
    }
    case C.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};
