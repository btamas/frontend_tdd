var assert = require('chai').assert,
	sinon = require('sinon'),
	Backbone = require('backbone'),

	Dropdown = require('../../libs/Dropdown/view');

suite('testing dropdown view', function() {
	setup(function() {
		Backbone.$('body').html(loadHTML('./content/testcontent1.html', __dirname));
		Dropdown.prototype.onTitleClick = sinon.spy(Dropdown.prototype, 'onTitleClick');
		Dropdown.prototype.onDropdownItemClick = sinon.spy(Dropdown.prototype, 'onDropdownItemClick');
		this.dropdown = new Dropdown({el : '.dropdown'});
	});

	teardown(function() {
		Dropdown.prototype.onTitleClick.restore();
		Dropdown.prototype.onDropdownItemClick.restore();
	});

	test('test title click', function() {
		this.dropdown.$(this.dropdown.ui.title).trigger('click');
		assert.isTrue(this.dropdown.onTitleClick.calledOnce);
	});

	test('test open status', function() {
		this.dropdown.$(this.dropdown.ui.title).trigger('click');
		assert.isTrue(this.dropdown.$(this.dropdown.ui.dropList).hasClass('open'));
	});

	test('test active status', function() {
		var dropItem = this.dropdown.$(this.dropdown.ui.dropdownItems).eq(0);

		dropItem.trigger('click');
		assert.isTrue(dropItem.hasClass('active'));
	});
});