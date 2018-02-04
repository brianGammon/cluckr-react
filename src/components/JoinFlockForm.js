import React, { Component } from 'react';

class JoinFlockForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      joinFlockForm: {
        value: '',
        error: '',
        touched: false,
      },
    };

    this.onJoinFlock = this.onJoinFlock.bind(this);
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
    if (!/^[A-Za-z0-9_-]+$/.test(value)) {
      const newState = Object.assign({}, this.state);
      newState.joinFlockForm.error = 'Please enter a valid flock ID.';
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

  render() {
    return (
      <div>
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
                className={`input ${this.state.joinFlockForm.error ? 'is-danger' : ''}`}
                type="text"
                value={this.state.joinFlockForm.value}
                onChange={e => this.setState({
                  joinFlockForm: {
                    value: e.target.value,
                    touched: true,
                  },
                })}
                placeholder="Enter a Flock ID"
              />
              {this.state.joinFlockForm.error &&
                <div className="help is-danger">
                  {this.state.joinFlockForm.error}
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
      </div>
    );
  }
}

export default JoinFlockForm;
