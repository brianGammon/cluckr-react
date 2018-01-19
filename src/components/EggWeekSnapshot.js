import React from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

const EggWeekSnapshot = ({ snapshot }) => (
  <div className="week-snapshot">
    <div className="level is-mobile week-snapshot-heading">
      <div className="level-left" />
      <div className="level-item">
        <p className="heading">Last 7 Days</p>
      </div>
    </div>
    <div className="columns is-mobile is-gapless">
      {Object.keys(snapshot).map(key => (
        <Link key={key} className="column" to={`/eggs/day/${key}`}>
          <div className={`has-text-centered box is-radiusless ${snapshot[key] > 0 ? 'is-success' : ''}`}>
            <p className="is-size-7">{ moment(key).format('MMM') }</p>
            <p>{ moment(key).format('D') }</p>
            <p>
              {snapshot[key] > 0 &&
                <span className="icon has-text-success">
                  <i className="fa fa-check-circle" aria-hidden="true" />
                </span>
              }
              {snapshot[key] === 0 &&
                <span className="icon has-text-grey">
                  <i className="fa fa-times-circle" aria-hidden="true" />
                </span>
              }
            </p>
          </div>
        </Link>
      ))
      }
    </div>
  </div>
);

export default EggWeekSnapshot;
