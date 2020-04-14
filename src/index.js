import React from 'react';
import { render } from 'react-dom';
import './css/style.css';
import Router from './components/Router';
// import ReactDOM from 'react-dom';

render(
  <Router />,
  document.getElementById('main')
  //OR: document.querySelector('#main')
);

//OR: ReactDOM.render(
//  <StorePicker />,
//  document.getElementById('main'));