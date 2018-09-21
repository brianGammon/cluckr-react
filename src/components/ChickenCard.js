import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { chickenType, chickenStatsType } from '../types';

const ChickenCard = ({
  chicken,
  chickenId,
  stats,
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
          <div className="media-right">
            <button className="button is-white" onClick={() => onDelete({ name: chicken.name, chickenId })}>
              <span className="icon trash">
                <i className="fa fa-trash-o" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ChickenCard.propTypes = {
  chicken: chickenType.isRequired,
  chickenId: PropTypes.string.isRequired,
  stats: chickenStatsType,
  onDelete: PropTypes.func.isRequired,
};

ChickenCard.defaultProps = {
  stats: null,
};

export default ChickenCard;
