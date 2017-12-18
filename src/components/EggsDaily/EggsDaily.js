import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { dateStringAsMoment, nowAsMoment } from '../../utils/dateHelper';
import EggsHeader from '../Common/EggsHeader';
import eggsByDateSelector from '../../selectors/eggsByDateSelector';
import EggList from './EggList';

const DaySwitcher = ({ eggs, match }) => {
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
          <p className="title is-4">{ Object.keys(eggs || {}).length }</p>
        </div>
      </div>
    </div>
  );
};

class EggsDaily extends Component {
  componentWillMount() {
    if (dateStringAsMoment(this.props.match.params.date).isAfter(nowAsMoment())) {
      this.props.history.push(`/eggs/day/${nowAsMoment().format('YYYY-MM-DD')}`);
    }
  }

  render() {
    return (
      <div>
        <EggsHeader title="Eggs By Day" date={this.props.match.params.date} />
        <DaySwitcher {...this.props} />
        <hr />
        <EggList eggs={this.props.eggs} deleteEgg={this.props.deleteEgg} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    eggs: eggsByDateSelector(state, props),
  };
};

export default connect(mapStateToProps)(EggsDaily);
