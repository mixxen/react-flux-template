/**
 * Module dependencies.
 */

var merge = require('react/lib/merge'),
    util  = require('util'),
    events = require('events');


/**
 * Expose `Store`
 */

exports = module.exports = Store;

/**
 * `Stores` contain the application state and logic. A `Store` registers
 * itself with the `Dispatcher` and provides it with a callback. This 
 * callback receives the `Action`'s data payload as a parameter.
 *
 * @param {Dispatcher} dispatcher
 */
function Store(dispatcher) {
  events.EventEmitter.call(this);

  //sample state
  this.state = {
    n: 0
  };

  //register callback with dispatcher
  dispatcher.register(function(payload) {

    var action = payload.action;

    switch(action.actionType) {

      case 'increment':
        this.increment();
        break;

      case 'decrement':
        this.decrement();
        break;
    }

    //EventEmitter interface
    //notify ControllerView something has changed
    this.emit('change');

  }.bind(this));
}

util.inherits(Store, events.EventEmitter);

/**
 * `ControllerViews` use getter methods to obtain the state of this `Store`.
 *
 * @return {Object} Should be read only
 */
Store.prototype.getState = function() {
  return this.state; //clone this.state if worried about modification
};

/**
 * Sample logic.
 */
Store.prototype.increment = function() {
  this.state.n++;
};

/**
 * Sample logic.
 */
Store.prototype.decrement = function() {
  this.state.n--;
};
