import _ from 'lodash';
import { C } from '../config/constants';

const initialState = {
  test: 'Testing',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case C.REF_ON: {
      const newState = Object.assign(
        {},
        state,
        action.payload,
      );
      return newState;
    }
    case C.REF_OFF: {
      const newState = _.omit(state, [action.payload]);
      return newState;
    }
    case C.LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
