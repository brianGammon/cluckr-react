import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dateStringAsMoment, nowAsMoment } from '../utils/dateHelper';
import EggsHeader from '../components/EggsHeader';
import DaySwitcher from '../components/DaySwitcher';
import eggsByDateSelector from '../selectors/eggsByDateSelector';
import EggList from '../components/EggList';
import { deleteItem } from '../actions';
import './EggsDailyPage.css';

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
        <EggList eggs={this.props.eggs} chickens={this.props.chickens} deleteEgg={this.props.deleteEgg} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    eggs: eggsByDateSelector(state, props),
    chickens: state.chickens,
  };
};

const mapDispatchToProps = dispatch => ({
  deleteEgg: eggId => dispatch(deleteItem('eggs', eggId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EggsDaily);
