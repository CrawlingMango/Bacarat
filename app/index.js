import React from 'react';
import { render } from 'react-dom';
import Bacarat from './app';

window.onload = () => {
  render(<Bacarat/>, document.getElementById('app'));
};