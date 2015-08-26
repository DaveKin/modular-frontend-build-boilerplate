global.$ = require('jquery');
global.jQuery = global.$;
global._ = require('underscore');
global.Backbone = require('backbone');
global.Backbone.$ = global.$;
global.Backbone.Radio = require('backbone.radio');
/*
 * Creating a global event channel here for use by modules
 * This simple example only uses a single channel but multiple channels
 * could be created if required. 
 */
global.eventChannel = global.Backbone.Radio.channel('general');
//debug the event channel by logginng all channel activity to the console
global.Backbone.Radio.tuneIn('general');