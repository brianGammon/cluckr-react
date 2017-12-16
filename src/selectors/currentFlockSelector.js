import { createSelector } from 'reselect';

// TODO: Look into how to properly wrap these selectors to get memoizing
const flocksSelector = state => state.flocks;
const currentFlockIdSelector = state => state.userSettings.currentFlockId;

const currentFlockSelector = createSelector(
  [flocksSelector, currentFlockIdSelector],
  (flocks, id) => flocks.find((flock) => {
    return flock.$key === id;
  }),
);

export default currentFlockSelector;
