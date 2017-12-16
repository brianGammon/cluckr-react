import _ from 'lodash';
import { createSelector } from 'reselect';

const eggsList = state => state.eggs;
const monthSelector = (state, props) => props.match.params.date;

const eggsByMonthSelector = createSelector(
  [eggsList, monthSelector],
  (eggs, date) => {
    console.log('Running eggs for month selector');
    return _.reduce(eggs, (accumulator, value, key) => {
      if (value.date.startsWith(date)) {
        // eslint-disable-next-line no-param-reassign
        accumulator[key] = value;
      }
      return accumulator;
    }, {});
  },
);

export default eggsByMonthSelector;
