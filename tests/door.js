var assert = require('chai').assert,

	Door = require('../libs/door');

suite('testing Door functionality', function() {
	setup(function() {
		this.door = new Door();
	});

	test('door initialize state', function() {
		assert.strictEqual(this.door.getState(), this.door.CLOSED);
	});

	test('toggle door', function() {
		assert.strictEqual(this.door.toggle().getState(), this.door.OPENED);
		assert.strictEqual(this.door.toggle().getState(), this.door.CLOSED);
	});
});
