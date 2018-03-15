import React from 'react';

const FlockStats = ({ stats }) => {
  if (!stats) {
    return (
      <div className="level is-mobile">
        <div className="level-item">
          <em>No eggs logged yet</em>
        </div>
      </div>
    );
  }

  return (
    <div className="level is-mobile">
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Total</p>
          <p className="title is-4">{stats.total}</p>
          <p className="subtitle is-6">Eggs</p>
        </div>
      </div>
      {stats.heaviest &&
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Heaviest</p>
            <p className="title is-4">{ stats.heaviest.weight }g</p>
            <p className="subtitle is-6">{ stats.heaviest.chickenName }</p>
          </div>
        </div>
      }
      {stats.averageWeight > 0 &&
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Avg Weight</p>
            <p className="title is-4">{ Math.round(stats.averageWeight * 10) / 10 }</p>
            <p className="subtitle is-6">Grams</p>
          </div>
        </div>
      }
      {stats.averageNumber >= 0 &&
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">30 Day Avg</p>
            <p className="title is-4">{ Math.round(stats.averageNumber * 10) / 10 }</p>
            <p className="subtitle is-6">Per Day</p>
          </div>
        </div>
      }
    </div>
  );
};

export default FlockStats;
