import React from 'react';
import PropTypes from 'prop-types';
import { chickenType } from '../types';

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

ChickenInfo.propTypes = {
  chicken: chickenType.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ChickenInfo;
