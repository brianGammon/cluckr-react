import { C } from '../config/constants';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case C.FLOCK: {
      return state.concat(action.payload);
    }
    case C.FLOCKS_RESET: {
      return initialState;
    }
    case C.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};
