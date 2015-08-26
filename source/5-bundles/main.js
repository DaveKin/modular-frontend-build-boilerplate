(function(doc){
  'use strict';
  var log = require('../1-tools/js/log'); //import a small logging tool
  //import a module
  var Mod = require('../4-modules/module-with-styles-and-js/script');
  //instantiate the module
  var mod = new Mod();

  log('the scripts have loaded');
  log('using the event channel to cause the module to react');
  var events = global.eventChannel;
  events.trigger('module:increment');
  events.trigger('module:increment');
  log(events.request('module:ping'));
})(document);
