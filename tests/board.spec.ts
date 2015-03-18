import Test = require('./test');
import chai = require('chai');
import _ = require('underscore');
var assert: any = chai.assert;

import Board = require('../libs/board');
import Exception = require('../libs/exception');

class BoardSuite extends Test.Suite {
	public name: string = 'Board';
	private board: Board.Board;

	public setup(): void {
		this.board = new Board.Board();
	}
}

class BoardValidStepTest extends Test.Test {
	public name: string = 'valid steps';
	private board: Board.Board;

	public dataProvider(): any[] {
		return [
			[1, 1],
			[1, 8],
			[10, 2],
			[10, 10]
		];
	}

	public test(stepX: number, stepY: number): void {
		this.board.stepTo(stepX, stepY);
		var fields: number[][] = this.board.getFields();
		assert.strictEqual(fields[stepY - 1][stepX - 1], 1);
	}
}

class BoardInvalidStepTest extends Test.Test {
	public name: string = 'invalid steps';
	private board: Board.Board;

	public dataProvider(): any[] {
		return [
			[0, 0],
			[0, 1],
			[11, 10],
			[10, 11],
			null,
			undefined,
			'test'
		];
	}

	public test(stepX: number, stepY: number): void {
		assert.throw(() => {
			this.board.stepTo(stepX, stepY);
		}, Exception.InvalidStepException);
	}
}

class BoardValidHorseStepsTest extends Test.Test {
	public name: string = 'valid horse steps';
	private board: Board.Board;

	public dataProvider(): any[] {
		return [
			[[[1, 1], [3, 2], [5, 1]]], //right
			[[[8, 4], [6, 3], [4, 4]]], //left
			[[[3, 2], [2, 4], [3, 6]]], //down
			[[[8, 8], [7, 6], [8, 4]]]  //up
		];
	}

	public test(steps: number[][]): void {
		_.forEach(steps, (step: number[], i: number) => {
			var stepX: number = step[0],
				stepY: number = step[1];
			this.board.stepTo(stepX, stepY);
			var fields: number[][] = this.board.getFields();
			assert.strictEqual(fields[stepY - 1][stepX - 1], i + 1);
		});
	}
}

var boardSuite: Test.Suite = new BoardSuite([
	new BoardValidStepTest(),
	new BoardInvalidStepTest(),
	new BoardValidHorseStepsTest()
]);
boardSuite.run();