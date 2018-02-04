import React from 'react';
import { connect } from 'react-redux';
import { updateUserSettings, deleteFlock, joinFlock, newFlock } from '../actions';
import FlockManager from '../components/FlockManager';
import './FlockManagerPage.css';

const FlockManagerPage = props => (
  <FlockManager {...props} />
);

const mapStateToProps = ({ flocks, userSettings: { currentFlockId }, auth: { uid } }) => ({
  uid,
  flocks,
  currentFlockId,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setCurrentFlock: (flockId) => {
    dispatch(updateUserSettings({ currentFlockId: flockId }))
      .then(() => ownProps.history.push('/flock'));
  },
  deleteFlock: flockId => dispatch(deleteFlock(flockId)),
  joinFlock: flockId => dispatch(joinFlock(flockId)),
  newFlock: flockId => dispatch(newFlock(flockId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlockManagerPage);
