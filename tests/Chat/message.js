var assert = require('chai').assert,
	withData = require('mocha-testdata'),
	_ = require('underscore'),
	fauxServer = require('backbone-faux-server'),

	testUtils = require('../setup_utils'),

	Message = require('../../libs/Chat/message');

suite('message', function() {
	var maxLength = Message.prototype.MAX_MESSAGE_LENGTH,
		validMessages = [
			'árvíztűrő tükörfúrógép',
			' ',
			testUtils.generateString(maxLength / 2, 'a'),
			testUtils.generateString(maxLength - 1, 'b'),
			testUtils.generateString(maxLength, 'c'),
			testUtils.generateString(maxLength / 2 - 1, 'n') + ' ' + testUtils.generateString(maxLength / 2, 'h')
		],
		invalidMessages = [
			testUtils.generateString(maxLength + 1),
			testUtils.generateString(maxLength / 2, 'x') + ' ' + testUtils.generateString(maxLength / 2, 'q'),
			testUtils.generateString(maxLength + 23)
		];

	setup(function() {
		this.message = new Message();
	});

	teardown(function() {
	});

	test('test validator without message', function() {
		assert.strictEqual(this.message.validate(), 'Invalid message format');
	});

	withData(validMessages).test('test validator with valid message', function(testMessage) {
		assert.isUndefined(this.message.validate({text : testMessage}));
	});

	withData(invalidMessages).test('test validator with too long message ', function(testMessage) {
		assert.strictEqual(this.message.validate({text : testMessage}), 'The message is too long');
	});

	test('test validator with too short message', function() {
		assert.strictEqual(this.message.validate({text : ''}), 'The message is too short');
	});

	test('save', function(done) {
		fauxServer.addRoute('save message', this.message.url, 'POST', function(context) {
			context.data.id = 15;
			return context.data;
		});

		this.message.set({
			text : 'test'
		});

		this.message.save().done(_.bind(function() {
			assert.deepEqual(this.message.attributes, { id: 15, text: 'test'});
			done();
		}, this));
	});
});
