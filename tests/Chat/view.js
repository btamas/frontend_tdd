var assert = require('chai').assert,
	_ = require('underscore'),
	withData = require('mocha-testdata'),

	testUtils = require('../setup_utils'),
	testContent = require('./content/testcontent.html'),

	ChatView = require('../../libs/Chat/view');

suite('testing dropdown view', function() {
	var maxLength = ChatView.prototype.MAX_MESSAGE_LENGTH,
		validMessages = [
			'árvíztűrő tükörfúrógép',
			' ',
			testUtils.generateString(maxLength / 2, 'a'),
			testUtils.generateString(maxLength - 1, 'b'),
			testUtils.generateString(maxLength, 'c'),
			testUtils.generateString(maxLength / 2 - 1, 'n') + ' ' + testUtils.generateString(maxLength / 2, 'h')
		],
		invalidMessages = [
			'',
			testUtils.generateString(maxLength + 1),
			testUtils.generateString(maxLength / 2, 'x') + ' ' + testUtils.generateString(maxLength / 2, 'q'),
			testUtils.generateString(maxLength + 23)
		];

	setup(function() {
		testUtils.loadTestContent(testContent);

		this.sinonSandbox = testUtils.spyFunctions(
			ChatView.prototype,
			['onSendButtonClick', '_validateMessage']
		);

		this.chatView = new ChatView({el : '.chat'});

		//pre select ui elements
		_.extend(this, {
			sendButton  : this.chatView.$(this.chatView.ui.sendButton),
			chatInput   : this.chatView.$(this.chatView.ui.chatInput),
			messagesBox : this.chatView.$(this.chatView.ui.messagesBox)
		});
	});

	teardown(function() {
		this.sinonSandbox.restore();
	});

	withData(validMessages).test('test validator ok', function(testMessage) {
		assert.strictEqual(this.chatView._validateMessage(testMessage), true);
	});

	withData(invalidMessages).test('test validator not ok', function(testMessage) {
		assert.strictEqual(this.chatView._validateMessage(testMessage), false);
	});

	test('send button calls validator', function() {
		this.sendButton.click();
		assert.isTrue(this.chatView.onSendButtonClick.calledOnce);
		assert.isTrue(this.chatView._validateMessage.calledOnce);
	});

	withData(validMessages).test('send button insert new message', function(testMessage) {
		this.chatInput.val(testMessage);
		this.sendButton.click();

		var messages = this.messagesBox.find('li');
		assert.lengthOf(messages, 1);
		assert.strictEqual(messages.text(), testMessage);
	});

	withData(invalidMessages).test('send button not insert invalid message', function(testMessage) {
		this.chatInput.val(testMessage);
		this.sendButton.click();

		var messages = this.messagesBox.find('li');
		assert.lengthOf(messages, 0);
	});

	test('more than one message', function() {
		//insert a valid message
		this.chatInput.val(validMessages[0]);
		this.sendButton.click();

		var messages = this.messagesBox.find('li');
		assert.lengthOf(messages, 1);
		assert.strictEqual(messages.text(), validMessages[0]);

		//insert invalid message
		this.chatInput.val(invalidMessages[0]);
		this.sendButton.click();

		messages = this.messagesBox.find('li');
		assert.lengthOf(messages, 1);

		//insert a valid message again
		this.chatInput.val(validMessages[1]);
		this.sendButton.click();

		messages = this.messagesBox.find('li');
		assert.lengthOf(messages, 2);
		assert.strictEqual(messages.eq(0).text(), validMessages[0]);
		assert.strictEqual(messages.eq(1).text(), validMessages[1]);
	});
});
