import { C } from '../config/constants';

const initialState = {
  available: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case C.UPDATE_AVAILABLE: {
      return {
        available: true,
      };
    }
    default: {
      return state;
    }
  }
};
