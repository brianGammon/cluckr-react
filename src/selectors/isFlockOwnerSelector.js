import { createSelector } from 'reselect';
import currentFlockSelector from './currentFlockSelector';

const currentUserSelector = state => state.userSettings.$key;

const isFlockOwnerSelector = createSelector(
  [currentFlockSelector, currentUserSelector],
  (flock, id) => {
    return flock ? flock.ownedBy === id : false;
  },
);

export default isFlockOwnerSelector;
