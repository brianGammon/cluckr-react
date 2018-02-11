import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ChickenListHeader = ({ numChickens, isFlockOwner }) => (
  <div className="level is-mobile">
    <div className="level-left">
      <div className="level-item">
        <p className="heading">Chickens</p>
      </div>
    </div>
    {isFlockOwner &&
      <div className="level-right">
        <div className="level-item has-text-centered">
          <Link
            className={`button is-small ${numChickens === 0
              ? 'is-primary'
              : ''} ${numChickens > 0 ? 'is-outlined' : ''}`}
            to="/chicken/add"
          >
            <span className="icon">
              <i className="fa fa-plus" aria-hidden="true" />
            </span>
            <span>Chicken</span>
          </Link>
        </div>
      </div>
    }
  </div>
);

ChickenListHeader.propTypes = {
  numChickens: PropTypes.number.isRequired,
  isFlockOwner: PropTypes.bool.isRequired,
};

export default ChickenListHeader;
