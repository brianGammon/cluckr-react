import React from 'react';
import { connect } from 'react-redux';
import Dayz from 'dayz';
import moment from 'moment';
import 'dayz/dist/dayz.css';
import './EggsMonthlyPage.css';
import EggsHeader from '../components/EggsHeader';
import eggsByMonthSelector from '../selectors/eggsByMonthSelector';
import MonthSwitcher from '../components/MonthSwitcher';

const EggsMonthly = ({ eggs, match, history }) => {
  const handleClick = date => history.push(`/eggs/day/${date}`);
  const handleDayClick = (event, date) => handleClick(date.format('YYYY-MM-DD'));
  const handleEventClick = (event, layout) => handleClick(layout.attributes.range.start.format('YYYY-MM-DD'));
  const currDate = moment.utc(match.params.date);
  const events = [];
  Object.keys(eggs || {}).forEach((id) => {
    const eggDate = moment.utc(eggs[id].date);
    const event = {
      content: eggs[id].chickenName,
      range: moment.range(
        eggDate,
        eggDate.clone().add(1, 'hour'),
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
