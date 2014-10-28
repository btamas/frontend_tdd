var assert = require('chai').assert,
	Backbone = require('backbone'),
	sinon = require('sinon'),

	testContent = require('./content/enter.html');

suite('enter', function() {
	setup(function() {
		Backbone.$('#sandbox').html(testContent);
		this.sinonSandbox = sinon.sandbox.create();

		this.enterEvent = Backbone.$.Event('keyup');
		this.enterEvent.keyCode = 13;
	});

	teardown(function() {
		this.sinonSandbox.restore();
	});

	test('test with an enter event listener on main element', function() {
		var View = Backbone.Marionette.ItemView.extend({
			behaviors : {
				Enter : {}
			},

			events : {
				'enter' : 'testHandler'
			},

			testHandler : function() {
			}
		});

		this.sinonSandbox.spy(View.prototype, 'testHandler');

		this.view = new View({
			el : '.test'
		});

		this.view.$el.trigger(this.enterEvent);

		assert.isTrue(this.view.testHandler.calledOnce);
	});

	test('test without any enter event listener', function() {
		var View = Backbone.Marionette.ItemView.extend({
			behaviors : {
				Enter : {}
			},

			events    : null
		});

		this.view = new View({
			el : '.test'
		});
	});

	test('test with an enter event listener', function() {
		var View = Backbone.Marionette.ItemView.extend({
			behaviors : {
				Enter : {}
			},

			events : {
				'enter .input1' : 'testHandler',
				'keyup .input2' : 'testClickHandler'
			},

			testHandler : function() {
			},

			testClickHandler : function() {
			}
		});

		this.sinonSandbox.spy(View.prototype, 'testHandler');
		this.sinonSandbox.spy(View.prototype, 'testClickHandler');

		this.view = new View({
			el : '.test'
		});

		this.view.$('.input1').trigger(this.enterEvent);

		this.enterEvent.keyCode = 65;

		this.view.$('.input1').trigger(this.enterEvent);

		assert.isTrue(this.view.testHandler.calledOnce);
		assert.isTrue(this.view.testClickHandler.notCalled);
	});
});
