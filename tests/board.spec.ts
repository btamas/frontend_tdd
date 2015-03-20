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

	public dataProvider(): number[][][][] {
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

class CustomBoardSuite extends Test.Suite {
	public name: string = 'Custom Board';
	private board: Board.Board;

	public setup(): void {
		this.board = new Board.Board(3, 3);
	}
}

class NoMoreValidStepTest extends Test.Test {
	public name: string = 'No more valid step';
	private board: Board.Board;

	public dataProvider(): number[][][][] {
		return [
			[[
				// u, d, * l, r * 2 = 8
				[1, 1],
				[3, 2], //2 possibility
				[1, 3], //left down
				[2, 1], //up right
				[3, 3], //down right
				[1, 2], //left up
				[3, 1], //right up
				[2, 3] //down left
			]],
			[[
				[2,2]
			]],
			[[
				[3, 1],
				[2, 3], //2 possibility
				[1, 1], //up left
				[3, 2], //right down
				[1, 3],
				[2, 1],
				[3, 3],
				[1, 2]
			]]
		];
	}

	public test(steps: number[][]): void {
		_.forEach(steps, (step)=> {
			var x = step[0],
				y = step[1];
			assert.isTrue(this.board.isThereAnyValidStep());
			this.board.stepTo(x, y);
		});
		assert.isFalse(this.board.isThereAnyValidStep());
	}
}

var boardSuite: Test.Suite = new BoardSuite([
	new BoardValidStepTest(),
	new BoardInvalidStepTest(),
	new BoardValidHorseStepsTest()
]);
boardSuite.run();

var customBoardSuite: Test.Suite = new CustomBoardSuite([
	new NoMoreValidStepTest()
]);
customBoardSuite.run();