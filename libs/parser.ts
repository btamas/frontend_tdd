/// <reference path="./libs.d.ts" />

import Exception = require('./exception');
import _ = require('underscore');

class Text {
    private static LINE_SEPARATOR = '\n';
    constructor(protected text: String) {}
    public isValid(): Boolean {
        return _.isString(this.text);
    }
    protected getLines(): Line[] {
        var textLines = this.text.split(Text.LINE_SEPARATOR);
        return _.map(textLines, function(textLine) {
            return new Line(textLine);
        });
    }
    public getColumns(): String[][] {
        var lines = this.getLines();
        return _.map(lines, function(line) {
            return line.getColumns();
        });
    }
}

class Line {
    protected static COLUMN_SEPARATOR = ',';
    constructor(protected text: String) {}
    public getColumns() {
        return this.text.split(Line.COLUMN_SEPARATOR);
    }
}

class LabelText extends Text {
    protected static LABEL_INDICATOR_TEXT = '#useFirstLineAsLabels';
    protected isLabelsIndicated() {
        return this.text.indexOf(LabelText.LABEL_INDICATOR_TEXT) === 0;
    }
    public getLabels() {
        if (!this.isLabelsIndicated()) {
            return null;
        }

        var lines = this.getLines();
        if (lines.length < 2) {
            return [];
        }
        return lines[1].getColumns();
    }
    public getColumns(): String[][] {
        if (!this.isLabelsIndicated()) {
            return super.getColumns();
        }

        var lines = this.getLines().splice(2);
        return _.map(lines, function(line) {
            return line.getColumns();
        })
    }
}

class Message {
    constructor(protected columns, protected labels?) {}
    get content(): any {
        if (this.labels) {
            return {
                labels: this.labels,
                data: this.columns
            };
        }

        if (this.columns.length === 1) {
            return this.columns[0];
        }

        return this.columns;
    }
}

export class Parser {
    public parse(input:String):any {
        var text = new LabelText(input);
        if (!text.isValid()) {
            throw new Exception.InvalidInputException();
        }

        var message = new Message(
            text.getColumns(),
            text.getLabels()
        );

        return message.content;
    }
}