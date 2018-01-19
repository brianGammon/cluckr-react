import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Dialog from '../Dialog';
import { deleteChicken } from '../../actions';

const ProfileCard = ({
  chicken,
  chickenId,
  stats,
  isFlockOwner,
  onDelete,
}) => {
  const imgUrl = chicken.thumbnailUrl ? chicken.thumbnailUrl : '/assets/images/default-profile-photo_thumb.png';
  const profilePicStyle = { backgroundImage: `url(${imgUrl})` };

  return (
    <div className="column is-half">
      <div className="box is-radiusless">
        <div className="media">
          <div className="media-left">
            <Link to={`/chicken/${chickenId}`}>
              <div className="profile-image-sm" style={profilePicStyle} />
            </Link>
          </div>
          <div className="media-content">
            <div className="content">
              <p className="is-clipped">
                <Link to={`/chicken/${chickenId}`}>
                  { chicken.name }
                </Link>
              </p>
              {stats && stats.mostEggs === chickenId &&
                <p>
                  <span className="icon">
                    <i className="fa fa-trophy" aria-hidden="true" />
                  </span> Top Producer
                </p>
              }
              {(stats && stats.heaviest && stats.heaviest.chickenId === chickenId) &&
                <p>
                  <span className="icon">
                    <i className="fa fa-trophy" aria-hidden="true" />
                  </span> Heaviest Egg
                </p>
              }
            </div>
          </div>
          {isFlockOwner &&
            <div className="media-right">
              <button className="button is-white" onClick={() => onDelete({ name: chicken.name, chickenId })}>
                <span className="icon trash">
                  <i className="fa fa-trash-o" />
                </span>
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

class ChickenList extends Component {
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
    this.props.deleteChicken(this.state.deleteCandidate.chickenId);
  }

  showModal(deleteCandidate) {
    this.setState({
      showModal: true,
      deleteCandidate,
    });
  }

  render() {
    const { chickens, stats, isFlockOwner } = this.props;
    const chickenKeys = Object.keys(chickens || {});
    if (chickenKeys.length === 0) {
      return (
        <div className="level is-mobile">
          <div className="level-item">
            {isFlockOwner
              ? <em>No chickens in your flock, <Link to="/chicken/add">add one</Link>?</em>
              : <em>No chickens in the flock yet</em>
            }
          </div>
        </div>
      );
    }

    return (
      <div className="columns is-variable is-2 is-multiline">
        {chickenKeys.map(chickenKey => (
          <ProfileCard
            key={chickenKey}
            chicken={chickens[chickenKey]}
            chickenId={chickenKey}
            stats={stats}
            isFlockOwner={isFlockOwner}
            onDelete={this.showModal}
          />))
        }
        <Dialog showModal={this.state.showModal} onYes={this.handleYes} onNo={this.handleNo}>
          <p>
            Are you sure you want to delete&nbsp;
            <span className="has-text-weight-bold">
              {this.state.deleteCandidate.name}
            </span>?
          </p>
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deleteChicken: chickenId => dispatch(deleteChicken(chickenId)),
});

export default connect(null, mapDispatchToProps)(ChickenList);
