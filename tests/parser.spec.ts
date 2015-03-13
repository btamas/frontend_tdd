/// <reference path="./tests.d.ts" />

import chai = require('chai');
var assert = chai.assert;
var testData = require('mocha-testdata');

import Parser = require('../libs/parser');
import Exception = require('../libs/exception');


suite('Parser', function () {
    setup(function () {
        this.parser = new Parser.Parser();
    });

    testData([
        ['', ['']],
        [',', ['', '']],
        ['apple', ['apple']],
        ['a,b', ['a', 'b']],
        ['a,b,c', ['a', 'b', 'c']],
        ['100,982,444,990,1', ['100', '982', '444', '990', '1']],
        ['Mark,Anthony,marka@lib.de', ['Mark', 'Anthony', 'marka@lib.de']]
    ]).test('one-line string input', function (input:String, output:Array<String>) {
        assert.deepEqual(this.parser.parse(input), output);
    });

    testData([
        null,
        void 0,
        2,
        [],
        new Date
    ]).test('one-line input is not string', function (input) {
        assert.throw(() => {
            this.parser.parse(input);
        }, Exception.InvalidInputException);
    });
});