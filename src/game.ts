import Board from "./board";
import Params from "./params.ts";

const getDelta = (randomDelta: number): number => (
    (randomDelta > 0)
    ? Math.floor(Math.random() * randomDelta)
    : 0
) + 1;

export default class Game {
    protected board: Board;
    protected cols: number;
    protected lastValue: number;
    protected over: boolean;
    protected started: boolean;
    protected paramRandomOrder: boolean;
    protected paramRandomDelta: number;
    protected paramFilledCells: number;

    constructor(size: number, columns?: number) {
        this.cols = columns && columns > 0 ? columns : 1;
        this.board = new Board(size * this.cols);
        this.lastValue = 0;
        this.over = false;
        this.started = false;
        this.paramRandomOrder = true;
        this.paramRandomDelta = 0;
        this.paramFilledCells = this.boardSize;
    }

    static fromParams(params: Params): Game {
        return new Game(
            params.boardRows,
            params.boardCols,
        ).fillBoard(
            params.randomOrder,
            params.randomDelta,
            params.filledCells,
        );
    }

    getParams(): Params {
        const p = new Params();
        p.boardRows = this.rows;
        p.boardCols = this.cols;
        p.randomOrder = this.paramRandomOrder;
        p.randomDelta = this.paramRandomDelta;
        p.filledCells = this.paramFilledCells;
        return p;
    }

    get boardSize(): number {
        return this.board.length;
    }

    get columns(): number {
        return this.cols;
    }

    get rows(): number {
        return Math.ceil(this.boardSize / this.columns);
    }

    isOver(): boolean {
        return this.over;
    }

    setFinish(): this {
        this.over = true;
        this.started = false;
        return this;
    }

    isStarted(): boolean {
        return this.started;
    }

    setStarted(): this {
        this.started = true;
        return this;
    }

    fillBoard(randomOrder: boolean = true, randomDelta: number = 0, filledCells?: number): this {
        let value = getDelta(randomDelta);
        filledCells = (
            typeof filledCells === "undefined"
            || filledCells > this.boardSize
            || filledCells < 0
        ) ? this.boardSize : filledCells;
        this.paramRandomOrder = randomOrder;
        this.paramRandomDelta = randomDelta;
        this.paramFilledCells = filledCells;
        for (let i = 0; i < filledCells; ++i) {
            let cell = randomOrder ? this.board.getRandomEmptyCell() : this.board.getCell(i);
            if (cell) {
                cell.value = value;
                const delta = getDelta(randomDelta);
                value = cell.nextValue(delta);
            }
        }
        return this;
    }

    getBoard(): Board {
        return this.board;
    }

    getCell(index: number) {
        return this.board.getCell(index);
    }

    getCellWithNextValue() {
        return this.board.findCellAfter(this.lastValue + getDelta(0));
    }

    setLastValue(value: number): this {
        this.lastValue = value;
        return this;
    }

    playerPickCell(index: number) {
        if (!this.isStarted()) return false;
        const nextCell = this.getCellWithNextValue();
        if (!nextCell) this.setFinish();
        if (this.over) return false;
        const thisCell = this.getCell(index);
        let success = false;
        if (nextCell && thisCell && thisCell.value && thisCell.value === nextCell.value) {
            success = true;
            this.setLastValue(thisCell.value);
            if (this.getCellWithNextValue() === undefined) this.setFinish();
        }
        return success;
    }
}
