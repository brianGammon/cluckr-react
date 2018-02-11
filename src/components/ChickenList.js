import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ChickenCard from './ChickenCard';
import { chickenType, chickenStatsType } from '../types';
import Dialog from './Dialog';

class ChickenList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      deleteCandidate: {},
    };

    this.handleNo = this.handleNo.bind(this);
    this.handleYes = this.handleYes.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  handleNo() {
    this.setState({ showModal: false });
  }

  handleYes() {
    this.setState({ showModal: false });
    this.props.deleteChicken(this.state.deleteCandidate.chickenId);
  }

  showModal(deleteCandidate) {
    this.setState({
      showModal: true,
      deleteCandidate,
    });
  }

  render() {
    const { chickens, stats, isFlockOwner } = this.props;
    const chickenKeys = Object.keys(chickens || {});
    if (chickenKeys.length === 0) {
      return (
        <div className="level is-mobile">
          <div className="level-item">
            {isFlockOwner
              ? <em>No chickens in your flock, <Link to="/chicken/add">add one</Link>?</em>
              : <em>No chickens in the flock yet</em>
            }
          </div>
        </div>
      );
    }

    return (
      <div className="columns is-variable is-2 is-multiline">
        {chickenKeys.map(chickenKey => (
          <ChickenCard
            key={chickenKey}
            chicken={chickens[chickenKey]}
            chickenId={chickenKey}
            stats={stats}
            isFlockOwner={isFlockOwner}
            onDelete={this.showModal}
          />))
        }
        <Dialog showModal={this.state.showModal} onYes={this.handleYes} onNo={this.handleNo}>
          <p>
            Are you sure you want to delete&nbsp;
            <span className="has-text-weight-bold">
              {this.state.deleteCandidate.name}
            </span>?
          </p>
        </Dialog>
      </div>
    );
  }
}

ChickenList.propTypes = {
  deleteChicken: PropTypes.func.isRequired,
  chickens: PropTypes.objectOf(chickenType),
  // https://github.com/yannickcr/eslint-plugin-react/issues/1389
  // eslint-disable-next-line react/no-typos
  stats: chickenStatsType.isRequired,
  isFlockOwner: PropTypes.bool.isRequired,
};
ChickenList.defaultProps = {
  chickens: null,
};

export default ChickenList;
