import PropTypes from 'prop-types';

export const chickenType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  breed: PropTypes.string,
  hatched: PropTypes.string,
  photo: PropTypes.string,
  photoPath: PropTypes.string,
  photoUrl: PropTypes.string,
  thumbnailPath: PropTypes.string,
  thumbnailUrl: PropTypes.string,
  modified: PropTypes.string,
  userId: PropTypes.string,
});

export const eggType = PropTypes.shape({
  chickenId: PropTypes.string.isRequired,
  chickenName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  modified: PropTypes.string,
  userId: PropTypes.string,
  weight: PropTypes.string,
  notes: PropTypes.string,
  damaged: PropTypes.bool,
});

export const flockType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  ownedBy: PropTypes.string.isRequired,
});

export const userSettingsType = PropTypes.shape({
  currentFlockId: PropTypes.string,
  displayName: PropTypes.string,
  flocks: PropTypes.objectOf(PropTypes.bool),
});

export const flockStatsType = PropTypes.shape({
  total: PropTypes.number.isRequired,
  heaviest: eggType,
  averageWeight: PropTypes.number,
  averageNumber: PropTypes.number,
  firstEgg: eggType,
  mostEggs: chickenType,
});

export const chickenStatsType = PropTypes.shape({
  total: PropTypes.number.isRequired,
  heaviest: eggType,
  longestStreak: PropTypes.number,
  lastSevenDays: PropTypes.objectOf(PropTypes.number),
});
