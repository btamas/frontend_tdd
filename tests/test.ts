/// <reference path="./tests.d.ts" />

import _ = require('underscore');
var testData = require('mocha-testdata');

export interface ISuite {
    name: String;
    run();
    tests: Array<ITest>;
    setup?();
    teardown?();
}

export class Suite implements ISuite {
    public name;
    public setup() {}
    public teardown() {}
    constructor(public tests: Array<ITest> = []) {}
    public run() {
        suite(this.name, () => {
            setup(this.setup);
            teardown(this.teardown);
            _.forEach(this.tests, function(test:ITest) {
                test.run();
            });
        });
    }
}

export interface ITest {
    name: String;
    run();
    test(...args: any[]);
    dataProvider?(): Array<any>;
}

export class Test implements ITest {
    public name;
    public dataProvider() { return []; }
    public test(...args) {}
    public run() {
        var data = this.dataProvider();
        if (data.length === 0) {
            test(this.name, this.test);
        }
        else {
            testData(data).test(this.name, this.test);
        }
    }
}