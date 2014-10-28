/**
 * @module controllers/Chat
 * @requires module:collections/Messages
 * @requires module:views/Chat
 */

var Backbone = require('backbone'),
	//This controller initializes the model and the view, so it needs them.
	Messages = require('./messages'),
	ChatView = require('./chatView'),

	//The controller uses Marionette Controller as its base.
	ChatController = Backbone.Marionette.Controller.extend(
		/** @lends module:controllers/Chat~ChatController.prototype */
		{
			/**
			 * @class ChatController
			 * @constructs
			 * @extends external:Backbone.Marionette.Controller
			 */
			//This function automatically runs, when we create an instance from this module.
			initialize : function() {
				//It creates a collection, that will store data.
				this.messages = new Messages();
				//It creates a view, that will contain the messages and the message input and send button also.
				this.chatView = new ChatView({
					//The view will use this element as main element.
					el         : '.chat',
					//The view will work with this data.
					collection : this.messages
				//The controller calls the render after the initialize, because we want to show the view instantly.
				}).render();

				//It wants to listen send:message event on the view. It's important to use this.listenTo, because
				//if the controller will destroy, the listenTo events automatically unbinds.
				this.listenTo(this.chatView, 'send:message', this.addMessage);
			},

			/**
			 * Add message
			 * @param {String} message Sent message
			 * @returns {Message}
			 */
			//This function defines the addMessage functionality. It is triggered by the view, and it triggers back
			//the view with the result (sent/error)
			addMessage : function(message) {
				//It adds data of the message to the collection. Only the data structure is necessary, because
				//the collection automatically creates a model based on the data.
				//The validate:true says, it wants to validate the data. If the data is not valid the add will return
				//with false else it will return with a model.
				var model = this.messages.add({text : message}, {validate : true});

				if (model) {
					//If the model is defined, it saves it.
					model.save();
					//It triggers the view, the message is sent. The render will automatically happen, when the model
					//will be saved.
					return this.chatView.trigger('message:sent');
				}

				//If the result of the add is false, we triggers the view with the error event.
				this.chatView.trigger('message:error');
			}
		});

module.exports = ChatController;