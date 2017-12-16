import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '../Dialog/Dialog';
import { updateUserSettings, deleteFlock, joinFlock, newFlock } from '../../actions';
import './FlockManager.css';

class FlockManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      deleteCandidate: {},
      joinFlockForm: {
        value: '',
        error: '',
        touched: false,
      },
      newFlockForm: {
        value: '',
        error: '',
        touched: false,
      },
    };

    this.handleNo = this.handleNo.bind(this);
    this.handleYes = this.handleYes.bind(this);
    this.showModal = this.showModal.bind(this);
    this.onJoinFlock = this.onJoinFlock.bind(this);
    this.onNewFlock = this.onNewFlock.bind(this);
  }

  onJoinFlock(e) {
    e.preventDefault();
    const { value } = this.state.joinFlockForm;
    if (!value) {
      const newState = Object.assign({}, this.state);
      newState.joinFlockForm.error = 'Enter a Flock ID.';
      this.joinFlockText.select();
      return this.setState(newState);
    }
    if (/[^A-Za-z0-9]+/.test(value)) {
      const newState = Object.assign({}, this.state);
      newState.joinFlockForm.error = 'Only use letters and numbers.';
      this.joinFlockText.select();
      return this.setState(newState);
    }
    return this.props.joinFlock(value)
      .then(() => this.props.history.push('/flock'))
      .catch((error) => {
        const newState = Object.assign({}, this.state);
        newState.joinFlockForm.error = error.message;
        this.joinFlockText.select();
        this.setState(newState);
      });
  }

  onNewFlock(e) {
    e.preventDefault();
    const { value } = this.state.newFlockForm;
    if (!value) {
      const newState = Object.assign({}, this.state);
      newState.newFlockForm.error = 'Enter a flock name.';
      this.newFlockText.select();
      return this.setState(newState);
    }
    if (/[^A-Za-z0-9]+/.test(value)) {
      const newState = Object.assign({}, this.state);
      newState.newFlockForm.error = 'Only use letters and numbers.';
      this.newFlockText.select();
      return this.setState(newState);
    }
    return this.props.newFlock(value)
      .then(() => this.props.history.push('/flock'))
      .catch((error) => {
        const newState = Object.assign({}, this.state);
        newState.newFlockForm.error = error.message;
        this.newFlockText.select();
        this.setState(newState);
      });
  }

  handleNo() {
    this.setState({ showModal: false });
  }

  handleYes() {
    this.setState({ showModal: false });
    this.props.deleteFlock(this.state.deleteCandidate.$key);
  }

  showModal(deleteCandidate) {
    this.setState({
      showModal: true,
      deleteCandidate,
    });
  }

  render() {
    const { newFlockForm, joinFlockForm, showModal, deleteCandidate } = this.state;
    const { uid, flocks, currentFlockId, setCurrentFlock } = this.props;
    return (
      <div className="flock-manager">
        <div className="level is-mobile">
          <div className="level-left">
            <div className="level-item">
              <p className="title is-6">My Flocks</p>
            </div>
          </div>
        </div>

        <div className="level is-mobile">
          <div className="level-left">
            <div className="level-item">
              <p className="heading">Manage an existing flock</p>
            </div>
          </div>
        </div>

        <div className="panel">
          {flocks.map(flock => (
            <div key={flock.$key} className="panel-block">
              <div className="level is-mobile wide">
                <div className="level-left">
                  <div
                    role="button"
                    tabIndex={0}
                    className="level-item"
                    onClick={() => setCurrentFlock(flock.$key)}
                  >
                    <span>{ flock.name }</span>
                    {flock.$key === currentFlockId &&
                      <span className="has-text-success">
                        <span className="icon">
                          <i className="fa fa-check-circle" aria-hidden="true" />
                        </span>
                      </span>
                    }
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    {flock.ownedBy === uid &&
                      <button className="button is-white" onClick={() => this.showModal(flock)}>
                        <span className="icon trash">
                          <i className="fa fa-trash-o" />
                        </span>
                      </button>
                    }
                  </div>
                </div>
              </div>

            </div>
          ))}
          {flocks.length === 0 &&
            <div className="panel-block">
              <p className="has-text-grey">
                <em>No flocks to manage, create or join one below...</em>
              </p>
            </div>
          }
        </div>

        <hr />

        <div className="level is-mobile">
          <div className="level-left">
            <div className="level-item">
              <p className="heading">Create a new flock</p>
            </div>
          </div>
        </div>
        <form onSubmit={this.onNewFlock}>
          <div className="field has-addons">
            <div className="control wide">
              <input
                ref={(input) => { this.newFlockText = input; }}
                maxLength="25"
                className={`input ${newFlockForm.error ? 'is-danger' : ''}`}
                type="text"
                value={newFlockForm.value}
                onChange={e => this.setState({
                  newFlockForm: {
                    value: e.target.value,
                    touched: true,
                  },
                })}
                placeholder="Enter a name for your flock"
              />
              {newFlockForm.error &&
                <div className="help is-danger">
                  {newFlockForm.error}
                </div>
              }
            </div>
            <div className="control">
              <button className="button is-light">
                <span className="icon">
                  <i className="fa fa-plus" />
                </span>
                <span>New</span>
              </button>
            </div>
          </div>
        </form>

        <hr />
        <div className="level is-mobile">
          <div className="level-left">
            <div className="level-item">
              <p className="heading">Join someone else&#39;s flock</p>
            </div>
          </div>
        </div>

        <form onSubmit={this.onJoinFlock}>
          <div className="field has-addons">
            <div className="control wide">
              <input
                ref={(input) => { this.joinFlockText = input; }}
                className={`input ${joinFlockForm.error ? 'is-danger' : ''}`}
                type="text"
                value={joinFlockForm.value}
                onChange={e => this.setState({
                  joinFlockForm: {
                    value: e.target.value,
                    touched: true,
                  },
                })}
                placeholder="Enter a Flock ID"
              />
              {joinFlockForm.error &&
                <div className="help is-danger">
                  {joinFlockForm.error}
                </div>
              }
            </div>
            <div className="control">
              <button className="button is-light">
                <span className="icon">
                  <i className="fa fa-link" />
                </span>
                <span>Join</span>
              </button>
            </div>
          </div>
        </form>
        {currentFlockId &&
          <div className="level">
            <div className="level-item">
              Invite someone to join your flock with this ID:
            </div>
            <div className="level-item">
              { currentFlockId }
            </div>
          </div>
        }
        <Dialog danger showModal={showModal} onYes={this.handleYes} onNo={this.handleNo}>
          <p>This will delete the flock,&nbsp;
            <span className="has-text-weight-bold">
              {deleteCandidate.name}
            </span>, along with all chickens and eggs belonging to it.
          </p>
          <br />
          <p>Are you sure? This cannot be reversed.</p>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ flocks, userSettings: { currentFlockId }, auth: { uid } }) => ({
  uid,
  flocks,
  currentFlockId,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setCurrentFlock: (flockId) => {
    dispatch(updateUserSettings({ currentFlockId: flockId }))
      .then(() => ownProps.history.push('/flock'));
  },
  deleteFlock: flockId => dispatch(deleteFlock(flockId)),
  joinFlock: flockId => dispatch(joinFlock(flockId)),
  newFlock: flockId => dispatch(newFlock(flockId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlockManager);
