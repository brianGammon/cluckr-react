import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Dialog from '../Dialog/Dialog';
import { deleteItem } from '../../actions';

const EggBox = ({ egg, eggId, onDelete }) => (
  <div className="box is-radiusless">
    <div className="media">
      <div className="media-left">
        <Link className="image is-32x32" to={`/eggs/edit/${eggId}`}>
          <img src="/assets/images/egg-icon.png" alt="egg-icon" />
        </Link>
      </div>
      <div className="media-content">
        <div className="columns is-mobile">
          <div className="column is-four-fifths is-clipped">
            {egg.chickenId !== 'unknown' &&
              <Link
                className="is-size-6"
                to={`/chicken/${egg.chickenId}`}
              >
                { egg.chickenName }
              </Link>
            }
            {egg.chickenId === 'unknown' &&
              <p className="is-size-6">{ egg.chickenName }</p>
            }
            <p className={`is-size-6 ${egg.weight ? '' : 'has-text-grey-light'}`}>
              { egg.weight ? egg.weight : '-- ' }g
            </p>
          </div>

          <div className="column edit-icon">
            <Link className="button is-white is-pulled-right" to={`/eggs/edit/${eggId}`}>
              <span className="icon">
                <i className="fa fa-pencil" />
              </span>
            </Link>
          </div>
        </div>

      </div>
      <div className="media-right">
        <button className="button is-white" onClick={onDelete}>
          <span className="icon trash">
            <i className="fa fa-trash-o" />
          </span>
        </button>
      </div>
    </div>
    <div className="egg-info">
      {egg.damaged &&
        <div className="columns is-variable is-1 is-mobile">
          <div className="column is-1 is-offset-1">
            <span className="icon has-text-danger is-pulled-right">
              <i className="fa fa-warning" />
            </span>
          </div>
          <div className="column">This egg was damaged</div>
        </div>
      }
      {egg.notes &&
        <div className="columns is-variable is-1 is-mobile">
          <div className="column is-1 is-offset-1">
            <span className="icon is-pulled-right">
              <i className="fa fa-sticky-note-o" />
            </span>
          </div>
          <div className="column">
            <em>&quot;{ egg.notes }&quot;</em>
          </div>
        </div>
      }
    </div>
  </div>
);

class EggList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      eggId: null,
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
    this.props.deleteEgg(this.state.eggId);
  }

  showModal(eggId) {
    this.setState({
      showModal: true,
      eggId,
    });
  }

  render() {
    const { eggs } = this.props;
    const eggIds = Object.keys(eggs || {});
    return (
      <div className="egg-list">
        {eggIds.map(id => (
          <EggBox key={id} egg={eggs[id]} eggId={id} onDelete={() => this.showModal(id)} />
        ))
        }
        <Dialog showModal={this.state.showModal} onYes={this.handleYes} onNo={this.handleNo}>
          <p>Are you sure you want to delete this egg?</p>
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deleteEgg: eggId => dispatch(deleteItem('eggs', eggId)),
});

export default connect(null, mapDispatchToProps)(EggList);
