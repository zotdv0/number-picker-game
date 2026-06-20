import Board from "./board";
import type Params from "./params.ts";

const getDelta = (randomDelta: number): number => (
    (randomDelta > 0)
    ? Math.floor(Math.random() * randomDelta)
    : 0
) + 1;

export default class Game {
    protected board: Board;
    protected cols: number;
    protected lastValue: number;

    constructor(size: number, columns?: number) {
        this.cols = columns && columns > 0 ? columns : 1;
        this.board = new Board(size * this.cols);
        this.lastValue = 0;
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

    get boardSize(): number {
        return this.board.length;
    }

    get columns(): number {
        return this.cols;
    }

    get rows(): number {
        return Math.ceil(this.boardSize / this.columns);
    }

    fillBoard(randomOrder: boolean = true, randomDelta: number = 0, filledCells?: number): this {
        let value = getDelta(randomDelta);
        filledCells = (
            typeof filledCells === "undefined"
            || filledCells > this.boardSize
            || filledCells < 0
        ) ? this.boardSize : filledCells;
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
        return this.board.findCellAfter(this.lastValue + 1);
    }

    setLastValue(value: number): this {
        this.lastValue = value;
        return this;
    }

    playerPickCell(index: number) {
        const nextCell = this.getCellWithNextValue();
        const thisCell = this.getCell(index);
        if (nextCell && thisCell && thisCell.value && thisCell.value === nextCell.value) {
            this.setLastValue(thisCell.value);
            return true;
        }
        return false;
    }
}
