/**
 * @module views/Chat
 * @requires module:views/Message
 */

var Backbone = require('backbone'),
	//It requires its subview.
	MessageView = require('./messageView'),

	//It is a compositeview. Different between composite view and collection view is the collection view only renders
	//the collection but nothing else. Composite view can manage other elements also and it has a child view container.
	ChatView = Backbone.Marionette.CompositeView.extend(/** @lends module:views/Chat~ChatView*/{
		/**
		 * @member {Backbone.Marionette.View}
		 * @default
		 */
		//This will be the child and if the collection changes, it will create childs automatically.
		childView          : MessageView,
		/**
		 * @member {String}
		 * @default
		 */
		//This html element will contains the child views.
		childViewContainer : '@ui.messageBox',

		ui : {
			messageBox : '.messages',
			chatInput  : 'input.chatMessage',
			sendButton : 'button.send'
		},

		/**
		 * @member
		 * @default
		 */
		//This is a little helper. Marionette views support behaviors. This little modules can modifie the behaviour
		//of the view and extend with features.
		behaviors : {
			//The enter filter fires enter event on the selectors, if the keyup event has keycode === 13
			Enter : {}
		},

		events : {
			'click @ui.sendButton' : 'onSendTrigger',
			'enter @ui.chatInput'  : 'onSendTrigger'
		},

		//This function modifies the default functionality of the marionette composite view. The composite view
		//automatically renders the template, but in this situation we already have a html code that we want to use.
		//So I modified it and disable the rendering part.
		_renderTemplate : function() {
			this.bindUIElements();
		},

		/**
		 * @class ChatView
		 * @constructs
		 * @extends external:Backbone.Marionette.CompositeView
		 */
		initialize : function() {
			//Calls the initialize function of the super class.
			ChatView.__super__.initialize.apply(this, arguments);

			//It listens to the message status events. They will be fired by the controller.
			this.listenTo(this, 'message:sent', this.onMessageSent);
			this.listenTo(this, 'message:error', this.onMessageError);
		},

		/**
		 * Handles message send
		 */
		onSendTrigger : function() {
			var message = this.$(this.ui.chatInput).val();
			//It communicates with the controller via events.
			this.trigger('send:message', message);
		},

		/**
		 * Handles message sent event
		 */
		onMessageSent : function() {
			this.$(this.ui.chatInput).val('').removeClass('error');
		},

		/**
		 * Handles message sent error event
		 */
		onMessageError : function() {
			this.$(this.ui.chatInput.addClass('error'));
		}
	});

module.exports = ChatView;