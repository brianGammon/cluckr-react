import _ from 'lodash';
import { createSelector } from 'reselect';

const eggsList = state => state.eggs;
const dateselector = (state, props) => props.match.params.date;

const eggsByDateSelector = createSelector(
  [eggsList, dateselector],
  (eggs, date) => {
    console.log('Running eggs for date selector');
    return _.reduce(eggs, (accumulator, value, key) => {
      if (value.date === date) {
        // eslint-disable-next-line no-param-reassign
        accumulator[key] = value;
      }
      return accumulator;
    }, {});
  },
);

export default eggsByDateSelector;
