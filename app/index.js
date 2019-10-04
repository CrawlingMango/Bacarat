import React from 'react';
import { render } from 'react-dom';
import Button from './components/button';

window.onload = () => {
  var root = document.createElement('div');
  root.id = 'react-root';
  document.body.appendChild(root);

  const state = {
    message: 'Hello World!'
  }

  const clickHandler = () => {
    console.log('Was clicked');
  }

  render(<Button text={state.message} onClick={clickHandler}></Button>, root);
};