import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import ProfileHeader from '../components/ProfileHeader';
import EggWeekSnapshot from '../components/EggWeekSnapshot';
import ChickenInfo from '../components/ChickenInfo';
import ChickenStatsHeader from '../components/ChickenStatsHeader';
import ChickenStats from '../components/ChickenStats';
import ImageViewer from '../components/ImageViewer';

import { chickenType } from '../types';

const ChickenProfile = (props) => {
  const {
    match,
    chickens,
    stats,
    showModal,
    openModal,
    handleCloseModal,
  } = props;
  const chickenIds = Object.keys(chickens || {});
  const currIndex = _.findIndex(
    chickenIds,
    chickenId => chickenId === match.params.id,
  );

  return (
    <div>
      <ProfileHeader chickenIds={chickenIds} index={currIndex} />
      <ChickenInfo chicken={chickens[chickenIds[currIndex]]} openModal={openModal} />
      <hr />
      <ChickenStatsHeader chickenId={chickenIds[currIndex] || ''} />
      <ChickenStats stats={stats} />
      <EggWeekSnapshot snapshot={stats.lastSevenDays} />
      <ImageViewer
        showModal={showModal}
        onClose={handleCloseModal}
        imageUrl={chickens[chickenIds[currIndex]].photoUrl}
      />
    </div>
  );
};

ChickenProfile.displayName = 'Chicken Profile';
ChickenProfile.propTypes = {
  match: PropTypes.shape({}).isRequired,
  stats: PropTypes.shape({}),
  showModal: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  chickens: PropTypes.objectOf(chickenType),
};
ChickenProfile.defaultProps = {
  chickens: null,
  stats: null,
};

export default ChickenProfile;
