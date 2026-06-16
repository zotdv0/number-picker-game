import Board from "./board";

const getDelta = (randomDelta: number): number => (
    (randomDelta > 0)
    ? Math.floor(Math.random() * randomDelta)
    : 0
) + 1;

export default class Game {
    protected board: Board;

    constructor(size: number) {
        this.board = new Board(size);
    }

    get boardSize(): number {
        return this.board.length;
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

    getCell(index: number) {
        return this.board.getCell(index);
    }
}
