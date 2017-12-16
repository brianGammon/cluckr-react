import { sortBy, forEach } from 'lodash';
import moment from 'moment';

export default (eggs) => {
  let heaviestEgg = null;
  let highestWeight = 0;
  let totalWithWeight = 0;
  let totalWeight = 0;
  let earliestDate = null;
  let daysSinceFirst = 0;
  const eggsPerChicken = {};

  const sortedEggs = sortBy(eggs, 'date');
  if (sortedEggs.length === 0) {
    return null;
  }

  sortedEggs.forEach((egg) => {
    if (!earliestDate) {
      earliestDate = egg.date;
    }

    if (!eggsPerChicken[egg.chickenId]) {
      eggsPerChicken[egg.chickenId] = 0;
    }
    eggsPerChicken[egg.chickenId] += 1;

    // Find heaviest & avg
    if (egg.weight) {
      totalWithWeight += 1;
      totalWeight += +egg.weight;
      if (+egg.weight > highestWeight) {
        heaviestEgg = egg;
        highestWeight = egg.weight;
      }
    }
  });

  // Figure out who laid the most eggs
  let topProducer = '';
  let most = 0;
  forEach(Object.keys(eggsPerChicken), (key) => {
    if (eggsPerChicken[key] > most) {
      topProducer = key;
      most = eggsPerChicken[key];
    }
  });

  const start = moment(earliestDate);
  const now = moment();
  daysSinceFirst = now.diff(start, 'days') + 1;

  return {
    total: sortedEggs.length,
    heaviest: heaviestEgg,
    averageWeight: totalWeight / totalWithWeight,
    averageNumber: sortedEggs.length / daysSinceFirst,
    firstEgg: earliestDate,
    mostEggs: topProducer,
  };
};
