import { C } from '../config/constants';

const initialState = {
  isLoading: false,
  message: 'Loading...',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case C.DATA_LOADING: {
      return {
        isLoading: true,
        message: (action && action.payload) || 'Loading...',
      };
    }
    case C.DATA_LOADED: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
