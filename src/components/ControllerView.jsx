/** @jsx React.DOM */

/**
 * Module dependencies.
 */

var React       = require('react'),
    Dispatcher  = require('../dispatcher/Dispatcher'),
    Store       = require('../stores/Store'),
    Actions     = require('../actions/Actions'),
    View        = require('./View.jsx');

/**
 * Flux Data Flow:
 *
 * view --> (action) --> dispatcher --> (reg cb) --> store...
 *
 * ...store --> (emit/handle change event) -->  controller-view --> (render)
 *
 */
var dispatcher = new Dispatcher();
var store = new Store(dispatcher);
var actions = new Actions(dispatcher);

var NUM_N = 500; //try something larger to test performance

/**
 * `ControllerViews` are special `Views` which handle events from `Stores`. Data
 * is pulled from the `Stores` when an event is received. `render()` is triggered 
 * using `setState()` or `forceUpdate()` causing all its descendants to render.
 */
var ControllerView = React.createClass({

  getInitialState: function() {
    return store.getState(); 
  },

  componentDidMount: function() {
    store.addListener('change', this.changeEventHandler);
  },

  componentWillUnmount: function() {
    store.removeListener('change', this.changeEventHandler);
  },

  render: function() {

    var foo = [];
    for(var ii = 0; ii < NUM_N; ii++) {

      // none of the foo nodes will change (this should be faster)
      // foo.push(
      //   <View
      //     n={0}
      //   />
      // );

      // all the foo nodes will change (this should be slower)
      foo.push(
        <View
          n={this.state.n}
        />
      );
    }

    return(
      <div>
        <h1>React Flux
          <hr/>
          <View
            n={this.state.n}
            actions={actions} 
          />
          <hr/>
        </h1>
        {foo}
      </div>
    );
  },

  /**
   * Event handler for events from the store. `setState()` will trigger
   * a `render()` call.
   */
  changeEventHandler: function() {
    this.setState(store.getState());
  }

});

/**
 * Expose `ControllerView`
 */
module.exports = ControllerView;