import React from 'react';

const Splash = () => {
  const loadingStyles = {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    background: 'rgba(39, 44, 51, .75)',
    paddingTop: '25vh',
    textAlign: 'center',
    zIndex: 999,
  };
  const pStyles = {
    fontFamily: '"courier", monospace',
    color: '#EEE',
  };

  return (
    <div style={loadingStyles}>
      <img src="/assets/icons/android-chrome-192x192.png" alt="" />
      <p style={pStyles}>Loading Clucker...</p>
    </div>
  );
};

export default Splash;
