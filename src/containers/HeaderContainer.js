import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../actions';
import Header from '../components/Header';
import './Header.css';

// TODO: Get app version from a constant written pre-build
const HeaderContainer = props => (
  <Header {...props} />
);

const mapStateToProps = ({
  auth: { authStatus, email },
}) => (
  {
    email,
    authStatus,
  }
);

const mapDispatchToProps = (dispatch) => {
  return {
    signOutAction: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
