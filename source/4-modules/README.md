# Modules

Modules are the parts that should be included into pages.

The module should not have any dependency on the presence of another module. It should fire and respond to events on a global event bus.

As the Javascript and Sass are imported seperately into bundles, there is the possibility of having multiple variants of style or functionality for a single module. This is an architectural decision to make but I think that style variants at least may be a useful feature. Functionality, less so as you don't want too much variance in a single module.

##Events

[Backbone.Radio](https://github.com/marionettejs/backbone.radio) enables modules to attach handlers to events or to triger events e.g. 
```Javascript
var eventChannel = Backbone.Radio.channel('channelname');

eventChannel.on('eventName', handler); //bind handler to event
eventChannel.off('eventName', handler); //unbind handler from event
eventChannel.once('eventName', handler); //respond once then unbind

eventChannel.trigger('eventName'); //trigger the event on this channel
``` 
it also gives the facility to send requests and replies via the event channel e.g.
```Javascript
//request 'dataplease' and store the return in 'somedata'
var somedata = eventChannel.request('dataplease');

//reply to a request for 'whatdata' and return the value of 'somedata'
eventChannel.reply('whatdata', function(){
	return somedata;
});
```
Backbone.Radio only allows one reply to a request, if more than one reply is bound to a request name, then only the last one bound will actually fire the reply. e.g.
```Javascript
//register two replies to the same request name
eventChannel.reply('numberplease', function(){
	return 1;
});
eventChannel.reply('numberplease', function(){
	return 2;
});

var number = eventChannel.request('numberplease');
// number = 2
// only the last reply returned a value
```