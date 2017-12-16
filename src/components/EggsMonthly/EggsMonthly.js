import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Dayz from 'dayz';
import moment from 'moment';
import 'dayz/dist/dayz.css';
import './EggsMonthly.css';
import EggsHeader from '../../components/Common/EggsHeader';
import eggsByMonthSelector from '../../selectors/eggsByMonthSelector';

const MonthSwitcher = ({ eggs, match }) => {
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
          <p className="title is-4">{ Object.keys(eggs || {}).length }</p>
        </div>
      </div>
    </div>
  );
};

const EggsMonthly = ({ eggs, match, history }) => {
  const handleClick = date => history.push(`/eggs/day/${date}`);
  const handleDayClick = (event, date) => handleClick(date.format('YYYY-MM-DD'));
  const handleEventClick = (event, layout) => handleClick(layout.attributes.range.start.format('YYYY-MM-DD'));
  const currDate = moment.utc(match.params.date);
  const events = [];
  Object.keys(eggs || {}).forEach((id) => {
    const eggDate = moment(eggs[id].date).clone();
    const event = {
      content: eggs[id].chickenName,
      range: moment.range(
        eggDate,
        eggDate.clone().add(1, 'day'),
      ),
    };
    events.push(event);
  });

  return (
    <div>
      <EggsHeader title="Eggs By Month" />
      <MonthSwitcher {...{ eggs, match }} />
      <Dayz
        display="month"
        date={currDate}
        events={new Dayz.EventsCollection(events)}
        onDayClick={handleDayClick}
        onEventClick={handleEventClick}
      />
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return ({
    eggs: eggsByMonthSelector(state, props),
  });
};

export default connect(mapStateToProps)(EggsMonthly);
