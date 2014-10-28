/**
 * @module collections/Messages
 * @requires module:models/Message
 */

var Backbone = require('backbone'),
	//It needs a reference to the submodel.
	Message = require('./message'),

	/**
	 * @class
	 * @extends external:Backbone.Collection
	 */
		//The marionette haven't extended the backbone collection, so we have to use the backbone.collection.
		Messages = Backbone.Collection.extend(
		/** @lends module:collections/Messages~Messages.prototype */
		{
			/**
			 * @member {Backbone.Model}
			 */
			//The collection will containts the kind of models. It can create and destroy them automatically.
			model : Message
		});

module.exports = Messages;