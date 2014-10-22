var Backbone = require('backbone'),
	sinon = require('sinon'),
	_ = require('underscore'),

	Utils = function() {};

Utils.prototype.loadTestContent = function(testContent) {
	Backbone.$('#sandbox').html(testContent);
};

Utils.prototype.loadTemplateContent = function(templateContent) {
	Backbone.$('#templates').html(templateContent);
};

Utils.prototype.spyFunctions = function(classObject, functionNames) {
	if (!_.isArray(functionNames)) {
		functionNames = [ functionNames ];
	}

	var sandbox = sinon.sandbox.create();

	functionNames.forEach(function(functionName) {
		sandbox.spy(classObject, functionName);
	});

	return sandbox;
};

Utils.prototype.generateString = function(length, character) {
	if (!_.isString(character) || character.length !== 1) {
		character = 'a';
	}

	return new Array(length + 1).join(character);
};

module.exports = new Utils();