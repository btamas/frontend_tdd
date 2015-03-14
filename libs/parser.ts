/// <reference path="./libs.d.ts" />

import Exception = require('./exception');
import _ = require('underscore');

export class Parser {
    private static COLUMN_SEPARATOR = ',';
    private static LINE_SEPARATOR = '\n';

    private getColumnsFromLine(text: String): Array<String> {
        return text.split(Parser.COLUMN_SEPARATOR);
    }

    private getLines(text: String): Array<String> {
        return text.split(Parser.LINE_SEPARATOR);
    }

    private getColumnsFromLines(text: String): String[][] {
        var lines = this.getLines(text);
        var columns = _.map(lines, (line) => {
            return this.getColumnsFromLine(line);
        });

        return columns;
    }

    public parse(text:String):Array<any> {
        if (!_.isString(text)) {
            throw new Exception.InvalidInputException();
        }

        var columns = this.getColumnsFromLines(text);

        if (columns.length === 1) {
            return columns[0];
        }

        return columns;
    }
}