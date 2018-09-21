import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteChicken as deleteChickenAction } from '../actions';
import ChickenList from '../components/ChickenList';
import ChickenListHeader from '../components/ChickenListHeader';
import FlockStats from '../components/FlockStats';
import FlockStatsHeader from '../components/FlockStatsHeader';
import flockStatsHelper from '../utils/flockStatsHelper';
import './FlockPage.css';

// eslint-disable-next-line
class FlockPage extends Component {
  render() {
    if (this.props.isLoading) {
      return null;
    }
    const {
      chickens,
      eggs,
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
        <ChickenListHeader numChickens={numChickens} />
        <ChickenList
          chickens={chickens}
          stats={flockStats}
          deleteChicken={deleteChicken}
        />
      </div>
    );
  }
}

const mapStateToProps = ({
  chickens,
  eggs,
  dataLoading: { isLoading },
}) => ({
  chickens,
  eggs,
  isLoading,
});

const mapDispatchToProps = dispatch => ({
  deleteChicken: chickenId => dispatch(deleteChickenAction(chickenId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlockPage);
