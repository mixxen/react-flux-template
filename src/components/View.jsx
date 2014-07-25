/** @jsx React.DOM */
var React = require('react');

/**
 * The `View` can generate `Actions`. `render()` is called from a `ControllerView` higher up
 * in the hierarchy.
 *
 */
var View = React.createClass({

  render: function() {

    var buttons = '';
    if(this.props.actions) {
      buttons = (
        <div>
          <button type='button' onClick={ this.props.actions.decrement.bind(this.props.actions) } >Minus One</button>
          <button type='button' onClick={ this.props.actions.increment.bind(this.props.actions) } >Add One</button>
        </div>
      );
    }

    return (
      <span>
        {buttons} 
        n = {this.props.n}&nbsp;
      </span>
    );
  },

});

/**
 * Expose `View`
 */
module.exports = View;