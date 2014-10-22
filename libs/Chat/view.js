/**
 * @module views/Chat
 */

var Backbone = require('backbone'),
	_ = require('underscore'),

	/**
	 * @class
	 * @extends external:Backbone.Marionette.View
	 */
		Chat = Backbone.Marionette.View.extend(
		/** @lends module:views/Chat~Chat.prototype */
		{
			/**
			 * Contains the maximal valid length of a message
			 * @const
			 */
			MAX_MESSAGE_LENGTH : 40,

			ui : {
				messagesBox : '.messages',
				chatInput   : '.chatMessage',
				sendButton  : '.send'
			},

			events : {
				'click @ui.sendButton' : 'onSendButtonClick'
			},

			/**
			 * Validate message
			 * @param message
			 * @returns {boolean}
			 * @private
			 */
			_validateMessage : function(message) {
				if (!_.isUndefined(message) && message.length > 0 && message.length <= this.MAX_MESSAGE_LENGTH) {
					return true;
				}
				return false;
			},

			/**
			 * Handles message send button click
			 */
			onSendButtonClick : function() {
				var chatInputElement = this.$(this.ui.chatInput),
					message = chatInputElement.val();

				if (this._validateMessage(message)) {
					this.$(this.ui.messagesBox).append('<li>' + message + '</li>');
				}
			}
		}
	);

module.exports = Chat;