import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import EggsHeader from '../Common/EggsHeader';
import eggsByDateSelector from '../../selectors/eggsByDateSelector';
import EggList from './EggList';

const DaySwitcher = ({ eggs, match }) => {
  const currDate = moment.utc(match.params.date);
  const previousDate = currDate.subtract(1, 'days').format('YYYY-MM-DD').toString();
  const nextDate = currDate.add(2, 'days').format('YYYY-MM-DD').toString();

  return (
    <div className="level is-mobile">
      <div className="level-item has-text-centered">
        <Link className="button" to={`/eggs/day/${previousDate}`}>
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
        <Link className="button" to={`/eggs/day/${nextDate}`}>
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
    // this.props.fetchDeleted();
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
