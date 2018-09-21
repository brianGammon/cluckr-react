import React from 'react';
import { Link } from 'react-router-dom';
import { appVersion } from '../config/constants';
import './User.css';

const UserBase = ({
  location,
  showTabs,
  errorMessage,
  children,
}) => {
  const pathname = (location && location.pathname) || '';

  return (
    <div className="user-base background">
      <div className="form-background">
        <div className="form-container">
          <div className="form-heading">
            <div className="columns is-gapless is-mobile">
              <div className="column is-narrow">
                <img className="chicken-img" src="/assets/images/chicken-sm.png" alt="chicken-logo" />
              </div>
              <div className="column">
                <p className="title is-3">Clucker</p>
                <p className="tagline subtitle is-5">Your backyard chicken egg tracker</p>
              </div>
            </div>
          </div>
          {showTabs &&
            <div className="tabs">
              <ul>
                <li className={pathname === '/login' ? 'is-active' : ''}>
                  <Link to="/login">Log In</Link>
                </li>
                <li className={pathname === '/signup' ? 'is-active' : ''}>
                  <Link to="/signup">Sign Up</Link>
                </li>
              </ul>
            </div>
          }
          {errorMessage &&
            <div className="notification is-danger">
              { errorMessage }
            </div>
          }
          {children}

          <p className="version-tag has-text-grey has-text-right is-size-7">{ appVersion }</p>

        </div>
      </div>
    </div>
  );
};

export default UserBase;
