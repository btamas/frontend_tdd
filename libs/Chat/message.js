/**
 * @module models/Message
 */

var Backbone = require('backbone'),
	_ = require('underscore'),

	/**
	 * @class
	 * @extends external:Backbone.Model
	 */
		//The marionette hasn't extended the backbone model, so we have to use backbone.model
		//when we want to create one.
		Message = Backbone.Model.extend(
		/** @lends module:models/Message~Message.prototype */
		{
			/**
			 * Maximum length of the message
			 * @constant
			 * @type {Number}
			 * @default
			 */
			//This is a constant that contains the maximum length of the message. If it needs we can easily modifies
			//and it is very useful for the tests also.
			MAX_MESSAGE_LENGTH : 40,

			/**
			 * @default
			 */
			//This object contains the default values of the model, so we can render it an empty view without any
			//error.
			defaults : {
				id   : null,
				text : ''
			},

			/**
			 * @member
			 * @default
			 */
			url : '/chat/messages',

			/**
			 * Validate message
			 * @param {Object} message - Message object
			 * @returns {string} Error message
			 */
			//This function contains the validation part. The parameter is the data of the model and the name 'validate'
			//is standard. If it will return with string, it will be the error message. If the model data is valid,
			//it will return with nothing.
			validate : function(message) {
				if (_.isUndefined(message) || _.isUndefined(message.text)) {
					return 'Invalid message format';
				}

				if (message.text.length === 0) {
					return 'The message is too short';
				}

				if (message.text.length > this.MAX_MESSAGE_LENGTH) {
					return 'The message is too long';
				}
			},

			/**
			 * Destroys model
			 * @returns {Message}
			 */
			//I modified the default behaviour of the backbone model, because it wants to send a
			//DELETE /chat/messages
			//request. We don't want this, so I keep only the event trigger part.
			destroy : function() {
				this.trigger('destroy', this, this.collection);
				return this;
			}
		}
	);

module.exports = Message;