import React from 'react';
import { render } from 'react-dom';
import App from './app';

window.onload = () => {
  var root = document.createElement('div');
  root.id = 'react-root';
  document.body.appendChild(root);

  render(<App/>, document.getElementById('app'));
};