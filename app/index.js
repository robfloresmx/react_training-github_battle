var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');

var App = require('./components/App');
var Badge = require('./components/Badge');
var Users = require('./components/Users');

ReactDOM.render(
    <App />,
    document.getElementById('app')
);