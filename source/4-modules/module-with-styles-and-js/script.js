module.exports = Backbone.View.extend({
	eventChannel: global.eventChannel, //reference global eventChannel
	counter: 0,

	initialize: function(){
		this.setChannelEvents();
	},

	setChannelEvents: function(){
		var me = this;

		this.eventChannel.reply('module:ping',function(){ 
			return 'pong ' + this.counter;
		}, me); // context 'me' is passed into the callback

		this.eventChannel.on('module:increment',function(){ 
			me.counter++;
		});		
	}
});