import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ChickenStatsHeader = ({ chickenId }) => (
  <div className="level is-mobile">
    <div className="level-left">
      <div className="level-item">
        <p className="heading">Stats</p>
      </div>
    </div>
    <div className="level-right">
      <div className="level-item has-text-centered">
        <Link
          className="button is-small is-primary"
          to={{ pathname: '/eggs/add', search: `?chickenId=${chickenId}` }}
          // queryParams="{chickenId: chickens[chickenIds[index]].$key}"
        >
          <span className="icon">
            <i className="fa fa-plus" aria-hidden="true" />
          </span>
          <span>Egg</span>
        </Link>
      </div>
    </div>
  </div>
);

ChickenStatsHeader.propTypes = {
  chickenId: PropTypes.string.isRequired,
};

export default ChickenStatsHeader;
