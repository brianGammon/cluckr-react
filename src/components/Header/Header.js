import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import currentFlockSelector from '../../selectors/currentFlockSelector';
import { signOut, updateUserSettings } from '../../actions';
import { C, appVersion } from '../../config/constants';
import './Header.css';

// TODO: Get app version from a constant written pre-build
class Header extends Component {
  constructor(props) {
    super(props);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.doSignOut = this.doSignOut.bind(this);
    this.state = {
      show: false,
    };
  }

  toggleCollapse() {
    this.setState({ show: !this.state.show });
  }

  selectFlock(flockId) {
    this.props.setCurrentFlock(flockId);
    this.toggleCollapse();
  }

  doSignOut() {
    this.props.signOutAction();
    this.toggleCollapse();
  }

  render() {
    if (this.props.authStatus !== C.LOGGED_IN) {
      return null;
    }

    const dayString = moment().format('DD');
    const monthString = moment().format('YYYY-MM');

    return (
      <nav className="header navbar is-fixed-top">
        <div className="navbar-brand">
          <Link className="navbar-item logo" to="/flock">
            <img src="/assets/images/cluckr_small.png" alt="cluckr" />
          </Link>
          <Link className="navbar-item" to="/flock">
            {this.props.currentFlock ? this.props.currentFlock.name : 'Cluckr'}
          </Link>

          {this.props.userSettings &&
            <div
              tabIndex={0}
              role="menuitem"
              className={`navbar-burger burger ${this.state.show ? 'is-active' : ''}`}
              onClick={this.toggleCollapse}
            >
              <span />
              <span />
              <span />
            </div>
          }
        </div>

        <div className={`navbar-menu ${(this.state.show ? 'is-active' : '')}`}>
          {this.props.userSettings &&
            <div className="navbar-end">
              {this.props.userSettings.flocks &&
                <div className="navbar-item has-dropdown is-hoverable">
                  <div className="navbar-link">
                    Eggs
                  </div>
                  <div className="navbar-dropdown">
                    <Link
                      className="navbar-item"
                      to={`/eggs/day/${monthString}-${dayString}`}
                      onClick={this.toggleCollapse}
                    >
                      <span className="icon">
                        <i className="fa fa-list" aria-hidden="true" />
                      </span> By Day
                    </Link>
                    <Link className="navbar-item" to={`/eggs/month/${monthString}`} onClick={this.toggleCollapse}>
                      <span className="icon">
                        <i className="fa fa-calendar" aria-hidden="true" />
                      </span> By Month
                    </Link>
                  </div>
                </div>
              }

              <div className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-link">
                  My Flocks
                </div>
                <div className="navbar-dropdown">
                  {this.props.flocks.map(flock => (
                    <Link
                      key={flock.$key}
                      className="navbar-item"
                      to="/flock"
                      onClick={() => this.selectFlock(flock.$key)}
                    >
                      {flock.name}
                      {flock.$key === this.props.userSettings.currentFlockId &&
                        <span className="icon has-text-success">
                          <i className="fa fa-check-circle" aria-hidden="true" />
                        </span>
                      }
                    </Link>))
                  }

                  {this.props.userSettings.flocks && <div className="navbar-divider" />}

                  <Link className="navbar-item" to="/flock-manager" onClick={this.toggleCollapse}>
                    <span className="icon">
                      <i className="fa fa-gear" aria-hidden="true" />
                    </span> Manage Flocks
                  </Link>
                </div>
              </div>
              <div className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-link">
                  <span className="icon is-hidden-touch">
                    <i className="fa fa-user" aria-hidden="true" />
                  </span>
                  <span className="is-hidden-desktop">{ this.props.userSettings.displayName }</span>
                </div>
                <div className="navbar-dropdown">
                  <div
                    tabIndex={0}
                    role="menuitem"
                    className="navbar-item header-sign-out"
                    onClick={this.doSignOut}
                  >
                    <span className="icon">
                      <i className="fa fa-sign-out" aria-hidden="true" />
                    </span> Sign out
                  </div>
                </div>
              </div>
              <div className="navbar-item">
                <p className="is-size-7">v{ appVersion }</p>
              </div>
            </div>
          }
        </div>
      </nav>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
