var assert = require('chai').assert,
	sinon = require('sinon'),
	fauxServer = require('backbone-faux-server'),

	ChatController = require('../../libs/Chat/chatController'),

	testContent = require('./content/testcontent.html'),
	testUtils = require('../setup_utils');

suite('chatController', function() {
	setup(function() {
		testUtils.loadTestContent(testContent);

		this.sinonSandbox = sinon.sandbox.create();
		this.sinonSandbox.spy(ChatController.prototype, 'addMessage');

		this.chatController = new ChatController();

		this.chatView = this.chatController.chatView;
		this.messages = this.chatController.messages;
	});

	teardown(function() {
		this.chatView.remove();
		this.sinonSandbox.restore();
	});

	test('add message event', function() {
		this.chatView.trigger('send:message');
		assert.isTrue(this.chatController.addMessage.calledOnce);
	});

	test('add message success', function() {
		fauxServer.addRoute('save message', '/chat/messages', 'POST', function(context) {
			context.data.id = 15;
			return context.data;
		});

		var spy = sinon.spy();
		this.chatView.on('message:sent', spy);

		this.chatController.addMessage('test');

		assert.isTrue(spy.calledOnce);
		assert.lengthOf(this.messages.models, 1);
	});

	test('add message error', function() {
		var spy = sinon.spy();
		this.chatView.on('message:error', spy);

		this.chatController.addMessage('');

		assert.isTrue(spy.calledOnce);
		assert.lengthOf(this.messages.models, 0);
	});
});
