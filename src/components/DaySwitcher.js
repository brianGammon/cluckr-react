import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import { eggType } from '../types';
import { dateStringAsMoment, nowAsMoment } from '../utils/dateHelper';

const DaySwitcher = ({ count, match }) => {
  const currDate = dateStringAsMoment(match.params.date);
  const previousDate = currDate.clone().subtract(1, 'days');
  const nextDate = currDate.clone().add(1, 'days');
  const isAfter = nextDate.isAfter(nowAsMoment());

  return (
    <div className="level is-mobile">
      <div className="level-item has-text-centered">
        <Link className="button" to={`/eggs/day/${previousDate.format('YYYY-MM-DD')}`}>
          <span className="icon is-small">
            <i className="fa fa-chevron-left" />
          </span>
        </Link>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <p className="title is-5">{ moment(match.params.date).format('MMM D, YYYY') }</p>
        </div>
      </div>

      <div className="level-item has-text-centered">
        <Link className="button" to={`/eggs/day/${nextDate.format('YYYY-MM-DD')}`} disabled={isAfter}>
          <span className="icon is-small">
            <i className="fa fa-chevron-right" />
          </span>
        </Link>
      </div>

      <div className="level-item has-text-centered">
        <Link className="button" to={`/eggs/month/${match.params.date.substring(0, 7)}`}>
          <span className="icon is-small">
            <i className="fa fa-calendar" />
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

DaySwitcher.propTypes = {
  match: PropTypes.shape({}).isRequired,
  eggs: PropTypes.objectOf(eggType),
};

DaySwitcher.defaultProps = {
  eggs: null,
};

export default DaySwitcher;
