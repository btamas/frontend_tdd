import Test = require('./test');
import chai = require('chai');
var assert = chai.assert;

import Parser = require('../libs/parser');
import Exception = require('../libs/exception');

class ParserSuite extends Test.Suite {
    public name = 'Parser';
    private parser:Parser.Parser;

    public setup() {
        this.parser = new Parser.Parser();
    }
}

class OneLineTest extends Test.Test {
    public name = 'one-line string input';
    private parser:Parser.Parser;

    public dataProvider() {
        return [
            ['', ['']],
            [',', ['', '']],
            ['apple', ['apple']],
            ['a,b', ['a', 'b']],
            ['a,b,c', ['a', 'b', 'c']],
            ['100,982,444,990,1', ['100', '982', '444', '990', '1']],
            ['Mark,Anthony,marka@lib.de', ['Mark', 'Anthony', 'marka@lib.de']]
        ];
    }

    public test(input, output) {
        assert.deepEqual(this.parser.parse(input), output);
    }
}

class OneLineIsNotString extends Test.Test {
    public name = 'one-line input is not string';
    private parser:Parser.Parser;

    public dataProvider() {
        return [
            null,
            void 0,
            2,
            [],
            new Date
        ];
    }

    public test(input) {
        assert.throw(() => {
            this.parser.parse(input);
        }, Exception.InvalidInputException);
    }
}

class MultiLineInput extends Test.Test {
    public name = 'multi-line string input';
    private parser:Parser.Parser;

    public dataProvider() {
        return [
            [
                '\n',
                [[''], ['']]
            ],
            [
                'a\na',
                [['a'], ['a']]
            ],
            [
                'app,le\n42\ncat',
                [['app', 'le'], ['42'], ['cat']]
            ],
            [
                '1\n , \n2',
                [['1'], [' ', ' '], ['2']]
            ],
            [
                '211,22,35\n10,20,33',
                [['211', '22', '35'], ['10', '20', '33']]
            ],
            [
                'luxembourg,kennedy,44\nbudapest,expo ter,5-7\ngyors,fo utca,9',
                [['luxembourg', 'kennedy', '44'], ['budapest', 'expo ter', '5-7'], ['gyors', 'fo utca', '9']]
            ]
        ];
    }

    public test(input:String, output:Array<String>) {
        assert.deepEqual(this.parser.parse(input), output);
    }
}

class SecondLineAsLabel extends Test.Test {
    public name = 'parse second line as label';
    private parser:Parser.Parser;

    public dataProvider() {
        return [
            [
                '#useFirstLineAsLabels\nName,Email,Phone\nMark,marc@be.com,998\nNoemi,noemi@ac.co.uk,888',
                {
                    labels: ['Name', 'Email', 'Phone'],
                    data: [
                        ['Mark', 'marc@be.com', '998'],
                        ['Noemi', 'noemi@ac.co.uk', '888']
                    ]
                }
            ],
            [
                '#useFirstLineAsLabels',
                {
                    labels: [],
                    data: []
                }
            ],
            [
                '#useFirstLineAsLabelsANDSOMETHING\nLabel1',
                {
                    labels: ['Label1'],
                    data: []
                }
            ],
            [
                '#useFirstLineAsLabels\n\nData1,Data2\nData3',
                {
                    labels: [''],
                    data: [
                        ['Data1', 'Data2'],
                        ['Data3']
                    ]
                }
            ],
            [
                '#NOTuseFirstLineAsLabels\nLabel1\nData1',
                [
                    ['#NOTuseFirstLineAsLabels'],
                    ['Label1'],
                    ['Data1']
                ]
            ],
        ];
    }

    public test(input:String, output:any) {
        assert.deepEqual(this.parser.parse(input), output);
    }
}

var parserSuite = new ParserSuite([
    new OneLineTest(),
    new OneLineIsNotString(),
    new MultiLineInput(),
    new SecondLineAsLabel()
]);
parserSuite.run();