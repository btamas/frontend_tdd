var assert = require('chai').assert,
	sinon = require('sinon'),

	ChatView = require('../../libs/Chat/chatView'),

	testContent = require('./content/testcontent.html'),
	testUtils = require('../setup_utils');

suite('chatView', function() {
	setup(function() {
		testUtils.loadTestContent(testContent);

		//spy event handlers
		this.sinonSandbox = sinon.sandbox.create();
		this.sinonSandbox.spy(ChatView.prototype, 'onSendTrigger');
		this.sinonSandbox.spy(ChatView.prototype, 'onMessageSent');
		this.sinonSandbox.spy(ChatView.prototype, 'onMessageError');

		this.chatView = new ChatView({
			el : '.chat'
		}).render();

		this.chatInput = this.chatView.$(this.chatView.ui.chatInput);
		this.sendButton = this.chatView.$(this.chatView.ui.sendButton);
	});

	teardown(function() {
		this.chatView.remove();
		this.sinonSandbox.restore();
	});

	test('message send', function() {
		this.chatInput.val('test');

		var handlerSpy = sinon.spy();

		this.chatView.on('send:message', handlerSpy);

		this.sendButton.click();

		assert.isTrue(this.chatView.onSendTrigger.calledOnce);
		assert.isTrue(handlerSpy.calledOnce);
		assert.isTrue(handlerSpy.calledWith('test'));
	});

	test('message sent', function() {
		this.chatInput.val('test').addClass('error');

		this.chatView.trigger('message:sent');

		assert.isTrue(this.chatView.onMessageSent.calledOnce);
		assert.isFalse(this.chatInput.hasClass('error'));
		assert.strictEqual(this.chatInput.val(), '');
	});

	test('message error', function() {
		this.chatView.trigger('message:error');

		this.chatInput.val('test');

		assert.isTrue(this.chatView.onMessageError.calledOnce);
		assert.isTrue(this.chatInput.hasClass('error'));
		assert.strictEqual(this.chatInput.val(), 'test');
	});
});
