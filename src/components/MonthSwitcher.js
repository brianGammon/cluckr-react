import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const MonthSwitcher = ({ count, match }) => {
  const currDate = moment.utc(match.params.date);
  const previousDate = currDate.subtract(1, 'months').format('YYYY-MM').toString();
  const nextDate = currDate.add(2, 'months').format('YYYY-MM').toString();

  return (
    <div className="level is-mobile">
      <div className="level-item has-text-centered">
        <Link className="button" to={`/eggs/month/${previousDate}`}>
          <span className="icon is-small">
            <i className="fa fa-chevron-left" />
          </span>
        </Link>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="title is-5">{ moment(match.params.date).format('MMMM YYYY') }</p>
        </div>
      </div>

      <div className="level-item has-text-centered">
        <Link className="button" to={`/eggs/month/${nextDate}`}>
          <span className="icon is-small">
            <i className="fa fa-chevron-right" />
          </span>
        </Link>
      </div>

      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Eggs</p>
          <p className="title is-4">{count}</p>
        </div>
      </div>
    </div>
  );
};

export default MonthSwitcher;
