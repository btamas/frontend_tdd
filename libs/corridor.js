var _ = require('underscore'),

	Door = require('./door'),

	/**
	 * Constructor of corridor that contains the doors.
	 * @constructor
	 */
	Corridor = function() {
		this._doors = _.map(new Array(100), function() {
			return new Door();
		});
	};

/**
 * Gets the doors states
 * @returns {Array}
 */
Corridor.prototype.getStates = function() {
	return _.map(this._doors, function(door) {
		return door.getState();
	});
};

/**
 * Toggle every n doors
 * @param {integer} n - Contains the modulo number
 * @returns {Corridor}
 */
Corridor.prototype.toggleDoors = function(n) {
	_.forEach(this._doors, function(door, i) {
		if ((i + 1) % n === 0) {
			door.toggle();
		}
	});

	return this;
};

module.exports = Corridor;
