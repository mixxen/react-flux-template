/** @jsx React.DOM */
var React           = require('react'),
    Actions         = require('./actions/Actions'),
    Dispatcher      = require('./dispatcher/Dispatcher'),
    Store           = require('./stores/Store'),
    ControllerView  = require('./components/ControllerView.jsx'); 

React.renderComponent(
  <ControllerView/>, 
  document.body 
);