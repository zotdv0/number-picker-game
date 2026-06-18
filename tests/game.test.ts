import {describe, expect, test} from "vitest";
import Game from "../src/game";

describe('Game', () => {

    test('checks game board size', () => {
        expect(new Game(1).boardSize).toBe(1);
        expect(new Game(25).boardSize).toBe(25);
    });

    test('checks ordered fill', () => {
        const game = new Game(3).fillBoard(false, 0, 2);
        expect(game.getCell(0)!.value).toBe(1);
        expect(game.getCell(1)!.value).toBe(2);
        expect(game.getCell(2)!.isEmpty()).toBeTruthy();
    });

    test('checks random fill', () => {
        const size = 5;
        const game = new Game(size).fillBoard(true, 0, size);
        const cells: number[] = [];
        for (let i = 0; i < size; i++) {
            const cell = game.getCell(i);
            if (cell && cell.value) cells.push(cell.value);
        }
        cells.sort((a,b) => (a - b));
        expect(cells).toStrictEqual([1, 2, 3, 4, 5]);
    });

    test('checks random delta', () => {
        const size = 5;
        const game = new Game(size).fillBoard(false, 5, size);
        let value = 0;
        for (let i = 0; i < size; i++) {
            let cellValue = game.getCell(i)!.value as number;
            expect(cellValue).toBeGreaterThan(value);
            value = cellValue;
        }
    });

    test('checks rows and columns', () => {
        const cols = 4, rows = 5;
        const game = new Game(rows, cols);
        expect(game.columns).toBe(cols);
        expect(game.rows).toBe(rows);
        expect(game.boardSize).toBe(cols * rows);
    });

});
