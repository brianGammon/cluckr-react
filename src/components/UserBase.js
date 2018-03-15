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
            <p className="title is-3">Cluckr</p>
            <p className="subtitle is-5 ">Your backyard chicken egg tracker</p>
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
