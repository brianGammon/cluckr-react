import _ from 'lodash';
import { createSelector } from 'reselect';

const eggsList = state => state;
const chickenId = (state, props) => props.match.params.id;

const eggsByChickenSelector = createSelector(
  [eggsList, chickenId],
  (eggs, id) => {
    console.log('Running eggs for chicken selector');
    return _.reduce(eggs, (accumulator, value, key) => {
      if (value.chickenId === id) {
        // eslint-disable-next-line no-param-reassign
        accumulator[key] = value;
      }
      return accumulator;
    }, {});
  },
);

export default eggsByChickenSelector;
