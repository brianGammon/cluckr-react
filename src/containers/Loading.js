import React from 'react';
import { connect } from 'react-redux';
import './Loading.css';

const Loading = ({ dataLoading }) => {
  if (!dataLoading.isLoading) {
    return null;
  }

  return (
    <div className="loading">
      <div className="spinner">
        <div className="rects">
          <div className="rect rect1" />
          <div className="rect rect2" />
          <div className="rect rect3" />
          <div className="rect rect4" />
          <div className="rect rect5" />
        </div>

        <div className="heading">{ dataLoading.message || 'Loading...'}</div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ dataLoading }) => ({ dataLoading });

export default connect(mapStateToProps)(Loading);
