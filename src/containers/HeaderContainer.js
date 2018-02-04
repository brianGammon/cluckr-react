import React from 'react';
import { connect } from 'react-redux';
import currentFlockSelector from '../selectors/currentFlockSelector';
import { signOut, updateUserSettings } from '../actions';
import Header from '../components/Header';
import './Header.css';

// TODO: Get app version from a constant written pre-build
const HeaderContainer = props => (
  <Header {...props} />
);

const mapStateToProps = ({
  userSettings,
  flocks,
  auth: { authStatus },
}) => (
  {
    currentFlock: currentFlockSelector({ flocks, userSettings }),
    flocks,
    userSettings,
    authStatus,
  }
);

const mapDispatchToProps = (dispatch) => {
  return {
    signOutAction: () => dispatch(signOut()),
    setCurrentFlock: flockId => dispatch(updateUserSettings({ currentFlockId: flockId })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
