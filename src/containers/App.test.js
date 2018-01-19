/* global it */
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import EggHeader from '../EggsHeader';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><EggHeader title="testing" /></Router>, div);
});
