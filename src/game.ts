import Board from "./board";

export default class Game {
    protected board: Board;

    constructor(size: number) {
        this.board = new Board(size);
    }

    get boardSize(): number {
        return this.board.length;
    }

    fillBoard() {
        let value = 1;
        for (let i = 0; i < this.boardSize; ++i) {
            let cell = this.board.getCell(i);
            if (cell) {
                cell.value = value;
                value = cell.nextValue();
            }
        }
        return this;
    }

    getCell(index: number) {
        return this.board.getCell(index);
    }
}
