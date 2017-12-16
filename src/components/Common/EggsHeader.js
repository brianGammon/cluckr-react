import React from 'react';
import { Link } from 'react-router-dom';

const EggsHeader = ({ title, date }) => (
  <div className="level is-mobile">
    <div className="level-left">
      <div className="level-item">
        <p className="title is-6">{title}</p>
      </div>
    </div>
    <div className="level-right">
      <div className="level-item has-text-centered">
        <Link
          className="button is-small is-primary"
          to={date ? { pathname: '/eggs/add', search: `?date=${date}` } : '/eggs/add'}
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

export default EggsHeader;
