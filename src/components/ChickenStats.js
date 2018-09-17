import React from 'react';
import { chickenStatsType } from '../types';

const ChickenStats = ({ stats }) => {
  if (!stats || stats.total === 0) {
    return (
      <div className="level is-mobile">
        <div className="level-item">
          <em>No eggs logged yet</em>
        </div>
      </div>
    );
  }

  return (
    <div className="level is-mobile content">
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Eggs</p>
          <p className="title is-4">{ stats.total }</p>
          <p className="subtitle is-6">Total</p>
        </div>
      </div>
      {stats.heaviest &&
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Heaviest</p>
            <p className="title is-4">{ stats.heaviest.weight }g</p>
            <p className="subtitle is-6">on { stats.heaviest.date }</p>
          </div>
        </div>
      }
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Longest Streak</p>
          <p className="title is-4">{ stats.longestStreak }</p>
          <p className="subtitle is-6">{ stats.longestStreak === 1 ? 'Day' : 'Days' }</p>
        </div>
      </div>
    </div>
  );
};

ChickenStats.propTypes = {
  stats: chickenStatsType,
};

ChickenStats.defaultProps = {
  stats: null,
};

export default ChickenStats;
