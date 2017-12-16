import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeAllDbRefs } from '../../actions';
// import Loading from '../../components/Loading/Loading';

class StateViewer extends Component {
  componentWillMount() {
    // this.props.fetchDeleted();
  }

  render() {
    // return <Loading />;
    return (
      <div>
        <div>
          <p>Auth</p>
          {Object.keys(this.props.auth || {}).map(key => (
            <div className="box" key={key}>
              Key:{key}-{JSON.stringify(this.props.auth[key])}
            </div>
          ))}
        </div>

        <div>
          <p>Flocks</p>
          {this.props.flocks.map(flock => (
            <div className="box" key={flock.$key}>
              {JSON.stringify(flock)}
            </div>
          ))}
        </div>

        <div>
          <p>Refs</p>
          {Object.keys(this.props.dbRefs || {}).map(key => (
            <div className="box" key={key}>
              Key:{key}-{JSON.stringify(this.props.dbRefs[key])}
            </div>
          ))}
        </div>

        <div>
          <p>User Settings</p>
          {Object.keys(this.props.userSettings || {}).map(key => (
            <div className="box" key={key}>
              Key:{key}-{JSON.stringify(this.props.userSettings[key])}
            </div>
          ))}
        </div>

        <div>
          <p>Chickens</p>
          {Object.keys(this.props.chickens || {}).map(chickenId => (
            <div className="box" key={chickenId}>
              ID={chickenId}-{JSON.stringify(this.props.chickens[chickenId])}
            </div>
          ))}
        </div>

        <div>
          <p>Eggs</p>
          {Object.keys(this.props.eggs || {}).map(eggId => (
            <div className="box" key={eggId}>
              ID={eggId}-{JSON.stringify(this.props.eggs[eggId])}
            </div>
          ))}
        </div>
        <button className="button" onClick={this.props.removeAll}>Remove All</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    eggs: state.eggs,
    dbRefs: state.dbRefs,
    userSettings: state.userSettings,
    flocks: state.flocks,
    chickens: state.chickens,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeAll: () => dispatch(removeAllDbRefs()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StateViewer);
