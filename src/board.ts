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

    getRandomEmptyCell() {
        const emptyCells = this.cells.filter(cell => cell.isEmpty());
        if (!emptyCells.length) return undefined;
        const index = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[index];
    }

    findCellAfter(value?: number) {
        let cells = this.cells.filter(cell =>
            !cell.isEmpty()
            && (cell.value as number) >= (value ?? -Infinity)
        );
        if (!cells.length) return undefined;
        return cells.reduce((c1, c2) => (c1.value as number) < (c2.value as number) ? c1 : c2);
    }
}
