import React from 'react';
import { connect } from 'react-redux';

const styles = {
  position: 'fixed',
  bottom: 0,
  width: '100%',
};

const UpdateAvailable = ({ available }) => {
  if (!available) {
    return null;
  }
  return (
    <div className="notification is-info" style={styles}>
      <div className="level is-mobile">
        <div className="level-left">
          Please refresh for a new version...
        </div>
        <div className="level-right">
          <button onClick={() => window.location.reload()} className="level-item button is-info">
            <span className="icon">
              <i className="fa fa-refresh" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ appUpdate }) => ({
  available: appUpdate.available,
});

export default connect(mapStateToProps)(UpdateAvailable);
