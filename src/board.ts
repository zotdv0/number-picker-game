import Cell from "./cell";

export default class Board {
    protected readonly cells: Cell[];

    constructor(size: number) {
        this.cells = Array(size);
        for (let i = 0; i < size; ++i) {
            this.cells[i] = new Cell(i);
        }
    }

    get length(): number {
        return this.cells.length;
    }

    getCell(index: number) {
        return this.cells[index];
    }

}
