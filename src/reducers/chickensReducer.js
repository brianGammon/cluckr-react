import { C } from '../config/constants';

const initialState = null;
export default (state = initialState, action) => {
  switch (action.type) {
    case C.CHICKENS: {
      return action.payload;
    }
    case C.CHICKENS_RESET: {
      return initialState;
    }
    case C.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};
