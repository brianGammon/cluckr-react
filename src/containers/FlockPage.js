import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteChicken as deleteChickenAction } from '../actions';
import ChickenList from '../components/ChickenList';
import ChickenListHeader from '../components/ChickenListHeader';
import FlockStats from '../components/FlockStats';
import FlockStatsHeader from '../components/FlockStatsHeader';
import isFlockOwnerSelector from '../selectors/isFlockOwnerSelector';
import flockStatsHelper from '../utils/flockStatsHelper';
import './FlockPage.css';

class FlockPage extends Component {
  componentDidMount() {
    const {
      isLoading,
      numFlocks,
      currentFlockId,
      history,
    } = this.props;
    if (!isLoading && (numFlocks === 0 || !currentFlockId)) {
      history.push('/flock-manager');
    }
  }

  render() {
    if (this.props.isLoading) {
      return null;
    }
    const {
      chickens,
      eggs,
      isFlockOwner,
      deleteChicken,
    } = this.props;
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
        <FlockStats stats={flockStats} chickens={chickens} />
        <hr />
        <ChickenListHeader numChickens={numChickens} isFlockOwner={isFlockOwner} />
        <ChickenList
          chickens={chickens}
          stats={flockStats}
          isFlockOwner={isFlockOwner}
          deleteChicken={deleteChicken}
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
  currentFlockId: userSettings.currentFlockId,
  chickens,
  eggs,
  isLoading,
});

const mapDispatchToProps = dispatch => ({
  deleteChicken: chickenId => dispatch(deleteChickenAction(chickenId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlockPage);
