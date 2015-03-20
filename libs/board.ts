/// <reference path="libs.d.ts" />

import _ = require('underscore');
import Exception = require('./exception');

export class Board {
	protected fields: Array<number>;

	private size: number = this.dimensionX * this.dimensionY;
	private actualPositionX: number;
	private actualPositionY: number;
	private actualValue: number = 1;

	constructor(private dimensionX: number = 10, private dimensionY: number = 10) {
		this.initialize();
	}

	public stepTo(x: number, y: number): void {
		if (!this.isValidStep(x, y)) {
			throw new Exception.InvalidStepException();
		}

		this.fields[this.getFieldNumber(x, y)] = this.actualValue++;
		this.actualPositionX = x;
		this.actualPositionY = y;
	}

	public getFields(): number[][] {
		var fieldsClone: number[] = _.clone(this.fields);
		return _.map(new Array(this.dimensionY), function (): number[] {
			return fieldsClone.splice(0, this.dimensionY);
		}, this);
	}

	public isThereAnyValidStep(): boolean {
		var x: number = this.actualPositionX,
			y: number = this.actualPositionY;

		return this.isFirstStep() ||
			this.isValidStep(x - 2, y - 1) ||
			this.isValidStep(x - 2, y + 1) ||
			this.isValidStep(x - 1, y - 2) ||
			this.isValidStep(x - 1, y + 2) ||
			this.isValidStep(x + 1, y - 2) ||
			this.isValidStep(x + 1, y + 2) ||
			this.isValidStep(x + 2, y - 1) ||
			this.isValidStep(x + 2, y + 1);
	}

	private initialize(): void {
		this.generateFields();
	}

	private generateFields(): void {
		this.fields = new Array(this.size);
	}

	private getFieldNumber(x: number, y: number): number {
		return (y - 1) * this.dimensionX + (x - 1);
	}

	private isOnTheField(x: number, y: number): boolean {
		return x > 0 && y > 0 && x <= this.dimensionX && y <= this.dimensionY;
	}

	private isValidHorseStep(x: number, y: number): boolean {
		var deltaX: number = Math.abs(x - this.actualPositionX),
			deltaY: number = Math.abs(y - this.actualPositionY);

		return deltaX === 2 && deltaY === 1 || deltaX === 1 && deltaY === 2;
	}

	private isFirstStep(): boolean {
		return _.isUndefined(this.actualPositionX) && _.isUndefined(this.actualPositionY);
	}

	private isEmpty(x: number, y: number): boolean {
		return !_.isNumber(this.fields[this.getFieldNumber(x, y)]);
	}

	private isValidStep(x: number, y: number): boolean {
		return this.isOnTheField(x, y) && this.isEmpty(x, y) && (this.isFirstStep() || this.isValidHorseStep(x, y));
	}
}