/// <reference path="./libs.d.ts" />

import Exception = require('./exception');
import _ = require('underscore');

export class Parser {
    public parse(text:String):Array<String> {
        if (_.isString(text)) {
            return text.split(',');
        }

        throw new Exception.InvalidInputException();
    }
}