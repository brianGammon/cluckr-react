import moment from 'moment';
import { sortBy, forEach } from 'lodash';
import { dateStringAsMoment, nowAsMoment } from '../utils/dateHelper';

export default (eggs) => {
  let totalEggs = 0;
  let heaviestEgg = null;
  let highestWeight = 0;
  let totalWithWeight = 0;
  let totalWeight = 0;
  let earliestDate = null;
  let thirtyDayCount = 0;
  const daysBackForAvg = 30;
  const thirtyDaysAgo = nowAsMoment().subtract(daysBackForAvg - 1, 'day');
  const eggsPerChicken = {};

  const sortedEggs = sortBy(eggs, 'date');
  if (sortedEggs.length === 0) {
    return null;
  }

  sortedEggs.forEach((egg) => {
    const thisEgg = moment(egg.date);
    const quantity = +egg.quantity || 1;
    totalEggs += quantity || 1;

    if (!earliestDate) {
      earliestDate = egg.date;
    }

    if (!eggsPerChicken[egg.chickenId]) {
      eggsPerChicken[egg.chickenId] = 0;
    }
    eggsPerChicken[egg.chickenId] += quantity;

    // Find heaviest & avg
    if (egg.weight) {
      totalWithWeight += 1;
      totalWeight += +egg.weight;
      if (+egg.weight > highestWeight) {
        heaviestEgg = egg;
        highestWeight = egg.weight;
      }
    }
    // Build a running total for the past 30 days
    if (thisEgg.isAfter(thirtyDaysAgo)) {
      thirtyDayCount += quantity;
    }
  });

  // Figure out who laid the most eggs
  let topProducer = '';
  let most = 0;
  forEach(Object.keys(eggsPerChicken), (key) => {
    if (key !== 'unknown' && eggsPerChicken[key] > most) {
      topProducer = key;
      most = eggsPerChicken[key];
    }
  });

  const earliest = dateStringAsMoment(earliestDate);
  let daysToGoBack = daysBackForAvg;
  if (earliest.isAfter(thirtyDaysAgo)) {
    const daysAfter = earliest.diff(thirtyDaysAgo, 'days');
    daysToGoBack = daysBackForAvg - daysAfter;
  }
  const averageNumber = thirtyDayCount > 0 ? thirtyDayCount / daysToGoBack : 0;

  return {
    total: totalEggs,
    heaviest: heaviestEgg,
    averageWeight: totalWeight / totalWithWeight,
    averageNumber,
    firstEgg: earliestDate,
    mostEggs: topProducer,
  };
};
