import React from 'react';
import FlockManagerPicker from './FlockManagerPicker';
import NewFlockForm from './NewFlockForm';
import JoinFlockForm from './JoinFlockForm';

const FlockManager = ({
  uid,
  flocks,
  currentFlockId,
  setCurrentFlock,
  history,
  newFlock,
  joinFlock,
  deleteFlock,
}) => {
  return (
    <div className="flock-manager">
      <div className="level is-mobile">
        <div className="level-left">
          <div className="level-item">
            <p className="title is-6">My Flocks</p>
          </div>
        </div>
      </div>

      <div className="level is-mobile">
        <div className="level-left">
          <div className="level-item">
            <p className="heading">Manage an existing flock</p>
          </div>
        </div>
      </div>

      <FlockManagerPicker
        {...{
          uid,
          flocks,
          currentFlockId,
          setCurrentFlock,
          deleteFlock,
        }}
      />

      <hr />

      <NewFlockForm history={history} newFlock={newFlock} />

      <hr />

      <JoinFlockForm history={history} joinFlock={joinFlock} />

      {currentFlockId &&
        <div className="level">
          <div className="level-item">
            Invite someone to join your flock with this ID:
          </div>
          <div className="level-item">
            { currentFlockId }
          </div>
        </div>
      }
    </div>
  );
};

export default FlockManager;
