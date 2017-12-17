import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import eggsByChickenSelector from '../../selectors/eggsByChickenSelector';
import isFlockOwnerSelector from '../../selectors/isFlockOwnerSelector';
import chickenStatsHelper from '../../utils/chickenStatsHelper';
import ImageViewer from '../../components/Common/ImageViewer';
import './ChickenProfile.css';

class ChickenProfile extends Component {
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
      match,
      chickens,
      eggs,
      isFlockOwner,
    } = this.props;
    const chickenIds = Object.keys(chickens || {});
    const currIndex = _.findIndex(
      chickenIds,
      chickenId => chickenId === match.params.id,
    );

    if (!chickens || !eggs) {
      return null;
    }

    const stats = chickenStatsHelper(eggs);
    return (
      <div>
        <ProfileHeader chickenIds={chickenIds} index={currIndex} isFlockOwner={isFlockOwner} />
        <ChickenInfo chicken={chickens[chickenIds[currIndex]]} openModal={this.openModal} />
        <hr />
        <ChickenStatsHeader chickenId={chickenIds[currIndex] || ''} />
        <ChickenStats stats={stats} />
        <EggWeekSnapshot snapshot={stats.lastSevenDays} />
        <ImageViewer
          showModal={this.state.showModal}
          onClose={this.handleCloseModal}
          imageUrl={chickens[chickenIds[currIndex]].photoUrl}
        />
      </div>
    );
  }
}

const ProfileHeader = ({ chickenIds, index, isFlockOwner }) => (
  <div className="level is-mobile">
    <div className="level-left">
      <div className="level-item">
        <p className="title is-6">Chicken Profile</p>
      </div>
      {isFlockOwner &&
        <div className="level-item">
          <Link className="button is-white" to={`/chicken/edit/${chickenIds[index]}`}>
            <span className="icon">
              <i className="fa fa-pencil" />
            </span>
          </Link>
        </div>
      }
    </div>
    {chickenIds.length > 1 &&
      <div className="level-right">
        <div className="level-item">
          <Link
            className="button"
            disabled={index === 0}
            to={`/chicken/${index > 0 ? chickenIds[index - 1] : chickenIds[index]}`}
          >
            <span className="icon is-small">
              <i className="fa fa-chevron-left" />
            </span>
          </Link>
        </div>
        <div className="level-item next-right">
          <Link
            className="button"
            disabled={index + 1 === chickenIds.length}
            to={`/chicken/${index < chickenIds.length - 1 ? chickenIds[index + 1] : chickenIds[index - 1]}`}
          >
            <span className="icon is-small">
              <i className="fa fa-chevron-right" />
            </span>
          </Link>
        </div>
      </div>
    }
  </div>
);

const ChickenInfo = ({ chicken, openModal }) => {
  const imgUrl = chicken.thumbnailUrl ? chicken.thumbnailUrl : '/assets/images/default-profile-photo_thumb.png';
  const profilePicStyle = { backgroundImage: `url(${imgUrl})` };

  return (
    <article className="media">
      <figure className="media-left">
        <div
          role="button"
          tabIndex="0"
          className="profile-image"
          onClick={chicken.photoUrl ? openModal : null}
          style={profilePicStyle}
        />
      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <span className="heading">
              Name
            </span>
            <span className="title is-6">
              { chicken.name }
            </span>
          </p>
          {chicken.breed &&
            <p>
              <span className="heading">
                Breed
              </span>
              <span className="title is-6">
                { chicken.breed }
              </span>
            </p>
          }
          {chicken.hatched &&
            <p>
              <span className="heading">
                Hatched
              </span>
              <span className="title is-6">
                { chicken.hatched }
              </span>
            </p>
          }
        </div>
      </div>
    </article>
  );
};

const ChickenStatsHeader = ({ chickenId }) => (
  <div className="level is-mobile">
    <div className="level-left">
      <div className="level-item">
        <p className="heading">Stats</p>
      </div>
    </div>
    <div className="level-right">
      <div className="level-item has-text-centered">
        <Link
          className="button is-small is-primary"
          to={{ pathname: '/eggs/add', search: `?chickenId=${chickenId}` }}
          // queryParams="{chickenId: chickens[chickenIds[index]].$key}"
        >
          <span className="icon">
            <i className="fa fa-plus" aria-hidden="true" />
          </span>
          <span>Egg</span>
        </Link>
      </div>
    </div>
  </div>
);

const ChickenStats = ({ stats }) => {
  if (!stats || stats.total === 0) {
    return (
      <div className="level is-mobile">
        <div className="level-item">
          <em>No eggs logged yet</em>
        </div>
      </div>
    );
  }

  return (
    <div className="level is-mobile content">
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Eggs</p>
          <p className="title is-4">{ stats.total }</p>
          <p className="subtitle is-6">Total</p>
        </div>
      </div>
      {stats.heaviest &&
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Heaviest</p>
            <p className="title is-4">{ stats.heaviest.weight }g</p>
            <p className="subtitle is-6">on { stats.heaviest.date }</p>
          </div>
        </div>
      }
      <div className="level-item has-text-centered">
        <div>
          <p className="heading">Longest Streak</p>
          <p className="title is-4">{ stats.longestStreak }</p>
          <p className="subtitle is-6">{ stats.longestStreak === 1 ? 'Day' : 'Days' }</p>
        </div>
      </div>
    </div>
  );
};

const EggWeekSnapshot = ({ snapshot }) => (
  <div className="week-snapshot">
    <div className="level is-mobile week-snapshot-heading">
      <div className="level-left" />
      <div className="level-item">
        <p className="heading">Last 7 Days</p>
      </div>
    </div>
    <div className="columns is-mobile is-gapless">
      {Object.keys(snapshot).map(key => (
        <Link key={key} className="column" to={`/eggs/day/${key}`}>
          <div className={`has-text-centered box is-radiusless ${snapshot[key] > 0 ? 'is-success' : ''}`}>
            <p className="is-size-7">{ moment(key).format('MMM') }</p>
            <p>{ moment(key).format('D') }</p>
            <p>
              {snapshot[key] > 0 &&
                <span className="icon has-text-success">
                  <i className="fa fa-check-circle" aria-hidden="true" />
                </span>
              }
              {snapshot[key] === 0 &&
                <span className="icon has-text-grey">
                  <i className="fa fa-times-circle" aria-hidden="true" />
                </span>
              }
            </p>
          </div>
        </Link>
      ))
      }
    </div>
  </div>
);

const mapStateToProps = ({
  flocks,
  userSettings,
  chickens,
  eggs,
}, props) => ({
  chickens,
  isFlockOwner: isFlockOwnerSelector({ flocks, userSettings }),
  eggs: eggsByChickenSelector(eggs, props),
});

export default connect(mapStateToProps)(ChickenProfile);
