import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ChickenList from './ChickenList';
import isFlockOwnerSelector from '../../selectors/isFlockOwnerSelector';
import flockStatsHelper from '../../utils/flockStatsHelper';
import './Flock.css';

const ChickenListHeader = ({ numChickens, isFlockOwner }) => (
  <div className="level is-mobile">
    <div className="level-left">
      <div className="level-item">
        <p className="heading">Chickens</p>
      </div>
    </div>
    {isFlockOwner &&
      <div className="level-right">
        <div className="level-item has-text-centered">
          <Link
            className={`button is-small ${numChickens === 0
              ? 'is-primary'
              : ''} ${numChickens > 0 ? 'is-outlined' : ''}`}
            to="/chicken/add"
          >
            <span className="icon">
              <i className="fa fa-plus" aria-hidden="true" />
            </span>
            <span>Chicken</span>
          </Link>
        </div>
      </div>
    }
  </div>
);

const FlockStatsHeader = ({ numChickens }) => (
  <div className="level is-mobile">
    <div className="level-left">
      <div className="level-item">
        <p className="heading">Stats</p>
      </div>
    </div>
    <div className="level-right">
      <div className="level-item has-text-centered">
        <Link className={`button is-small ${numChickens > 0 ? 'is-primary' : ''}`} to="/eggs/add">
          <span className="icon">
            <i className="fa fa-plus" aria-hidden="true" />
          </span>
          <span>Egg</span>
        </Link>
      </div>
    </div>
  </div>
);

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
      {stats.averageNumber > 0 &&
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Avg</p>
            <p className="title is-4">{ Math.round(stats.averageNumber * 10) / 10 }</p>
            <p className="subtitle is-6">Per Day</p>
          </div>
        </div>
      }
    </div>
  );
};

class Flock extends Component {
  componentDidMount() {
    const { isLoading, numFlocks, history } = this.props;
    if (!isLoading && numFlocks === 0) {
      history.push('/flock-manager');
    }
  }

  render() {
    if (this.props.isLoading) {
      return null;
    }
    const { chickens, eggs, isFlockOwner } = this.props;
    const numChickens = Object.keys(chickens || {}).length;
    const flockStats = flockStatsHelper(eggs);

    return (
      <div className="flock-page content">
        <div className="level is-mobile">
          <div className="level-left">
            <div className="level-item">
              <p className="title is-6">Manage Flock</p>
            </div>
          </div>
        </div>
        <FlockStatsHeader numChickens={numChickens} />
        <FlockStats stats={flockStats} />
        <hr />
        <ChickenListHeader numChickens={numChickens} isFlockOwner={isFlockOwner} />
        <ChickenList
          chickens={chickens}
          stats={flockStats}
          isFlockOwner={isFlockOwner}
        />
      </div>
    );
  }
}

const mapStateToProps = ({
  flocks,
  userSettings,
  chickens,
  eggs,
  dataLoading: { isLoading },
}) => ({
  numFlocks: flocks.length,
  isFlockOwner: isFlockOwnerSelector({ flocks, userSettings }),
  chickens,
  eggs,
  isLoading,
});

export default connect(mapStateToProps)(Flock);
