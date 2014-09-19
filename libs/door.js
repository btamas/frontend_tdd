/**
 * Door class
 * @constructor
 */
var Door = function() {
	/**
	 * Contains the doors state
	 * @type {boolean}
	 * @private
	 */
	this._state = this.CLOSED;
};

/**
 * Contains the state of open
 * @type {boolean}
 * @constant
 */
Door.prototype.OPENED = true;

/**
 * Contains the state of close
 * @type {boolean}
 * @constant
 */
Door.prototype.CLOSED = false;

/**
 * Gets back the state of the door
 * @returns {boolean}
 */
Door.prototype.getState = function() {
	return this._state;
};

/**
 * Change the state of the door
 * @returns {Door}
 */
Door.prototype.toggle = function() {
	this._state = this._state === this.CLOSED ? this.OPENED : this.CLOSED;
	return this;
};

module.exports = Door;
