var assert = require('chai').assert,
	sinon = require('sinon'),
	_ = require('underscore'),
	fauxServer = require('backbone-faux-server'),

	testUtils = require('../setup_utils'),

	Message = require('../../libs/Chat/message'),
	MessageView = require('../../libs/Chat/messageView');

suite('messageView', function() {
	setup(function() {
		this.sandbox = testUtils.loadTestContent('');

		//spy event handlers
		this.sinonSandbox = sinon.sandbox.create();
		this.sinonSandbox.spy(MessageView.prototype, 'onClick');
		this.sinonSandbox.spy(Message.prototype, 'destroy');

		this.message = new Message();
		this.messageView = new MessageView({
			model : this.message
		});
		this.messageView.$el.appendTo(this.sandbox);
	});

	teardown(function() {
		this.message.destroy();
		this.sinonSandbox.restore();
	});

	test('messageView renders default', function() {
		this.messageView.render();
		var messageBox = this.sandbox.find('.' + this.messageView.className);
		assert.lengthOf(messageBox, 1);
		assert.strictEqual(messageBox.html(), this.messageView.template(this.message.attributes));
	});

	test('messageView can destroys', function() {
		this.messageView.render();
		this.messageView.remove();
		var messageBox = this.sandbox.find('.' + this.messageView.className);
		assert.lengthOf(messageBox, 0);
		assert.strictEqual(this.sandbox.html(), '');
	});

	test('messageView renders message', function() {
		this.message.set({
			text : 'test'
		});
		this.messageView.render();
		var messageBox = this.sandbox.find('.' + this.messageView.className);
		assert.lengthOf(messageBox, 1);
		assert.strictEqual(messageBox.html(), this.messageView.template(this.message.attributes));
	});

	test('messageView renders sent message', function(done) {
		//set server
		fauxServer.addRoute('save message', this.message.url, 'POST', function(context) {
			context.data.id = 1;
			return context.data;
		});

		//change message
		this.message.set({
			text : 'test'
		});
		this.messageView.render();

		var messageBox = this.sandbox.find('.' + this.messageView.className);
		assert.lengthOf(messageBox, 1);

		this.message.save().done(_.bind(function() {
			assert.strictEqual(messageBox.html(), this.messageView.template(this.message.attributes));
			assert.isTrue(messageBox.hasClass('sent'));
			done();
		}, this));
	});

	test('click destroys model', function() {
		this.messageView.render();
		this.messageView.$el.click();

		assert.isTrue(this.messageView.onClick.calledOnce);
		assert.isTrue(this.message.destroy.calledOnce);
	});
});
