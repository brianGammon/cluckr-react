import React from 'react';
import { Link } from 'react-router-dom';

const FlockStatsHeader = ({ numChickens }) => (
  <div className="level is-mobile">
    <div className="level-left">
      <div className="level-item">
        <p className="heading">Stats</p>
      </div>
    </div>
    <div className="level-right">
      <div className="level-item has-text-centered">
        <Link className={`button is-small ${numChickens > 0 ? 'is-primary' : ''}`} to="/eggs/add">
          <span className="icon">
            <i className="fa fa-plus" aria-hidden="true" />
          </span>
          <span>Egg</span>
        </Link>
      </div>
    </div>
  </div>
);

export default FlockStatsHeader;
