import React from 'react';
import { Link } from 'react-router-dom';

const ProfileHeader = ({ chickenIds, index }) => (
  <div className="level is-mobile">
    <div className="level-left">
      <div className="level-item">
        <p className="title is-6">Chicken Profile</p>
      </div>
      <div className="level-item">
        <Link className="button is-white" to={`/chicken/edit/${chickenIds[index]}`}>
          <span className="icon">
            <i className="fa fa-pencil" />
          </span>
        </Link>
      </div>
    </div>
    {chickenIds.length > 1 &&
      <div className="level-right">
        <div className="level-item">
          <Link
            className="button"
            disabled={index === 0}
            to={`/chicken/${index > 0 ? chickenIds[index - 1] : chickenIds[index]}`}
          >
            <span className="icon is-small">
              <i className="fa fa-chevron-left" />
            </span>
          </Link>
        </div>
        <div className="level-item next-right">
          <Link
            className="button"
            disabled={index + 1 === chickenIds.length}
            to={`/chicken/${index < chickenIds.length - 1 ? chickenIds[index + 1] : chickenIds[index - 1]}`}
          >
            <span className="icon is-small">
              <i className="fa fa-chevron-right" />
            </span>
          </Link>
        </div>
      </div>
    }
  </div>
);

export default ProfileHeader;
