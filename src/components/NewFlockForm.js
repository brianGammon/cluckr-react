import React, { Component } from 'react';

class NewFlockForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newFlockForm: {
        value: '',
        error: '',
        touched: false,
      },
    };

    this.onNewFlock = this.onNewFlock.bind(this);
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
    if (!/^[A-Za-z0-9 _-]+$/.test(value)) {
      const newState = Object.assign({}, this.state);
      newState.newFlockForm.error = 'Only use letters, numbers, spaces, underscores, or dashes.';
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

  render() {
    return (
      <div>
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
                className={`input ${this.state.newFlockForm.error ? 'is-danger' : ''}`}
                type="text"
                value={this.state.newFlockForm.value}
                onChange={e => this.setState({
                  newFlockForm: {
                    value: e.target.value,
                    touched: true,
                  },
                })}
                placeholder="Enter a name for your flock"
              />
              {this.state.newFlockForm.error &&
                <div className="help is-danger">
                  {this.state.newFlockForm.error}
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
      </div>
    );
  }
}

export default NewFlockForm;
