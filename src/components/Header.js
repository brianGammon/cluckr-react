import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { C, appVersion } from '../config/constants';

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

  doSignOut() {
    this.props.signOutAction();
    this.toggleCollapse();
  }

  render() {
    const { email, authStatus } = this.props;
    const signedIn = authStatus === C.LOGGED_IN;

    if (!signedIn) {
      return null;
    }
    const dayString = moment().format('DD');
    const monthString = moment().format('YYYY-MM');

    return (
      <nav className="header navbar is-fixed-top">
        <div className="navbar-brand">
          <Link className="navbar-item logo" to="/flock">
            <img src="/assets/icons/android-chrome-192x192.png" alt="clucker" />
          </Link>
          <Link className="navbar-item" to="/flock">
            Clucker
          </Link>

          {signedIn &&
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
          {signedIn &&
            <div className="navbar-end">
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

              <div className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-link">
                  <span className="icon is-hidden-touch">
                    <i className="fa fa-user" aria-hidden="true" />
                  </span>
                  <span className="is-hidden-desktop">{email}</span>
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

export default Header;
