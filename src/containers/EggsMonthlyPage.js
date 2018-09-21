import React from 'react';
import { connect } from 'react-redux';
import Dayz from 'dayz';
import moment from 'moment';
import 'dayz/dist/dayz.css';
import './EggsMonthlyPage.css';
import EggsHeader from '../components/EggsHeader';
import eggsByMonthSelector from '../selectors/eggsByMonthSelector';
import MonthSwitcher from '../components/MonthSwitcher';

const EggsMonthly = ({
  eggs, count, chickens, match, history,
}) => {
  const handleClick = date => history.push(`/eggs/day/${date}`);
  const handleDayClick = (event, date) => handleClick(date.format('YYYY-MM-DD'));
  const handleEventClick = (event, layout) => handleClick(layout.attributes.range.start.format('YYYY-MM-DD'));
  const currDate = moment.utc(match.params.date);
  const events = [];
  Object.keys(eggs || {}).forEach((id) => {
    const egg = eggs[id];
    const eggDate = moment.utc(egg.date);
    const content = egg.bulkMode
      ? `Bulk (${egg.quantity || 1})`
      : (chickens[eggs[id].chickenId] && chickens[eggs[id].chickenId].name) || 'Unknown';
    const event = {
      content,
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
      <MonthSwitcher {...{ count, match }} />
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
  const eggs = eggsByMonthSelector(state, props);
  let count = 0;
  Object.keys(eggs || {}).forEach((key) => {
    count += +eggs[key].quantity || 1;
  });
  return ({
    eggs,
    count,
    chickens: state.chickens,
  });
};

export default connect(mapStateToProps)(EggsMonthly);
