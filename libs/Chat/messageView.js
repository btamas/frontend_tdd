/**
 * @module views/Message
 */

var Backbone = require('backbone'),
	_ = require('underscore'),

	//This is an itemview. The itemview represents a model or an object.
	MessageView = Backbone.Marionette.ItemView.extend(/** @lends module:views/MessageView~MessageView */{
		/**
		 * @member
		 * @default
		 */
		//This will be the tag, when we create one of them.
		tagName   : 'li',
		/**
		 * @member
		 * @default
		 */
		//This will be the class, when we create of of them.
		className : 'message',
		//This value contains the template. I used the template engine of underscore. If the render function of the view
		//runs, the template renders automatically and inserted to the main element ($el).
		template  : _.template('(<%= id %>) <%= text %>'),

		events : {
			'click' : 'onClick'
		},

		/**
		 * @class MessageView
		 * @extends external:Backbone.Marionette.ItemView
		 * @constructs
		 */
		initialize : function() {
			MessageView.__super__.initialize.apply(this, arguments);
			//If the model of the view change, we want to render the view automatically.
			this.listenTo(this.model, 'change', this.render);
		},

		/**
		 * Handles click event
		 */
		onClick : function() {
			//If we wants to remove an element, we should delete the just the model. It triggers the collections,
			//that triggers the compositeview and that destroys the our view.
			this.model.destroy();
		},

		/**
		 * Runs after render. It sets the sent class to the main element.
		 */
		//This function runs when we rerender the view.
		onRender : function() {
			//We can easily get data from the model.
			if (this.model.get('id')) {
				this.$el.addClass('sent');
			}
		}
	});

module.exports = MessageView;