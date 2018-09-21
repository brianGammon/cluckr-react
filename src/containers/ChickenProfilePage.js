import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChickenProfile from '../components/ChickenProfile';
import eggsByChickenSelector from '../selectors/eggsByChickenSelector';
import chickenStatsHelper from '../utils/chickenStatsHelper';
import './ChickenProfilePage.css';

class ChickenProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };

    this.openModal = this.openModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  openModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    const {
      chickens,
      eggs,
    } = this.props;

    if (!chickens || !eggs) {
      return null;
    }

    const stats = chickenStatsHelper(eggs);
    return (
      <ChickenProfile
        {...this.props}
        showModal={this.state.showModal}
        openModal={this.openModal}
        handleCloseModal={this.handleCloseModal}
        stats={stats}
      />
    );
  }
}

const mapStateToProps = ({
  chickens,
  eggs,
}, props) => ({
  chickens,
  eggs: eggsByChickenSelector(eggs, props),
});

export default connect(mapStateToProps)(ChickenProfilePage);
