import React from 'react';
import _ from 'lodash';
import ProfileHeader from '../components/ProfileHeader';
import EggWeekSnapshot from '../components/EggWeekSnapshot';
import ChickenInfo from '../components/ChickenInfo';
import ChickenStatsHeader from '../components/ChickenStatsHeader';
import ChickenStats from '../components/ChickenStats';
import ImageViewer from '../components/ImageViewer';

const ChickenProfile = (props) => {
  const {
    match,
    chickens,
    isFlockOwner,
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
      <ProfileHeader chickenIds={chickenIds} index={currIndex} isFlockOwner={isFlockOwner} />
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

export default ChickenProfile;
