var assert = require('chai').assert,
	_ = require('underscore'),

	Door = require('../libs/door'),
	Corridor = require('../libs/corridor');

suite('test corridor', function() {
	var DOOR_COUNT = 100;
	setup(function() {
		this.corridor = new Corridor();
	});

	test('print doors initial state', function() {
		var doors = _.map(new Array(DOOR_COUNT), function() {
			return Door.prototype.CLOSED;
		});

		assert.deepEqual(this.corridor.getStates(), doors);
	});

	test('toggle every door', function() {
		this.corridor.toggleDoors(1);

		var doors = _.map(new Array(DOOR_COUNT), function() {
			return Door.prototype.OPENED;
		});

		assert.deepEqual(this.corridor.getStates(), doors);
	});

	test('toggle every second door', function() {
		this.corridor.toggleDoors(2);

		var doors = _.map(new Array(DOOR_COUNT), function(item, i) {
			return (i + 1) % 2 === 0 ? Door.prototype.OPENED : Door.prototype.CLOSED;
		});

		assert.deepEqual(this.corridor.getStates(), doors);

		// toggle it back
		this.corridor.toggleDoors(2);

		doors = _.map(new Array(DOOR_COUNT), function() {
			return Door.prototype.CLOSED;
		});

		assert.deepEqual(this.corridor.getStates(), doors);
	});

	test('toggle every second and every fifth door', function() {
		this.corridor.toggleDoors(2);
		this.corridor.toggleDoors(5);

		var doors = _.map(new Array(DOOR_COUNT), function(item, i) {
			switch (0) {
				case (i + 1) % 10:
					return Door.prototype.CLOSED;
				case (i + 1) % 5:
					return Door.prototype.OPENED;
				case (i + 1) % 2:
					return Door.prototype.OPENED;
				default:
					return Door.prototype.CLOSED;
			}
		});

		assert.deepEqual(this.corridor.getStates(), doors);
	});
});
