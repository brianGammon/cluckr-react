import React, { Component } from 'react';
import Dialog from './Dialog';

class FlockManagerPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      deleteCandidate: {},
    };

    this.handleNo = this.handleNo.bind(this);
    this.handleYes = this.handleYes.bind(this);
    this.showModal = this.showModal.bind(this);
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
    const {
      showModal,
      deleteCandidate,
    } = this.state;
    const {
      uid,
      flocks,
      currentFlockId,
      setCurrentFlock,
    } = this.props;

    return (
      <div>
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

export default FlockManagerPicker;
