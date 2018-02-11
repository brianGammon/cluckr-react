import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { eggType } from '../types';
import Dialog from './Dialog';
import EggBox from './EggBox';

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

EggList.propTypes = {
  eggs: PropTypes.objectOf(eggType),
  deleteEgg: PropTypes.func.isRequired,
};

EggList.defaultProps = {
  eggs: null,
};

export default EggList;
