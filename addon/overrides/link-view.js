import Ember from "ember";

export default Ember.LinkView.reopen({

  eventName : 'tap',

  __defaultTapOnPress : true,

  init: function() {

    //run normal linkView setup
    this._super.apply(this, arguments);

    // Map desired event name to invoke function
    var defaultTapOnPress = this.get('__defaultTapOnPress'),
      eventName = this.get('eventName');

    if (defaultTapOnPress && eventName === 'tap') {
      this.on('press', this, this._invoke);
    }

  },

  __bustClick: function(ev) {
    ev.preventDefault();
  },

  didInsertElement: function() {
    this.$().on('click.ember-mobiletouch', this.__bustClick);
    this._super();
  },

  willDestroyElement: function() {
    this.$().off('click.ember-mobiletouch');
    this._super();
  }

});
