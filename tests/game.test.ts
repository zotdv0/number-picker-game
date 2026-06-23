import {describe, expect, test} from "vitest";
import Game from "../src/game";
import Params from "../src/params";

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

    test('creates new game from params', () => {
        const params = new Params();
        params.boardRows = 3;
        params.boardCols = 4;
        params.filledCells = 5;
        const game = Game.fromParams(params);
        expect(game.rows).toBe(3);
        expect(game.columns).toBe(4);
        const cells = Array.from(
            {length: game.boardSize},
            (_, i) => game.getCell(i)
        ).filter((c) => c && !c.isEmpty());
        expect(cells).toHaveLength(params.filledCells);
    });

    test('gets first value', () => {
        const game = new Game(5).fillBoard(false, 0, 2);
        const nextCell = game.getCellWithNextValue();
        expect(nextCell!.value).toBe(1);
    });

    test('gets second value', () => {
        const game = new Game(5).fillBoard(false, 0, 2);
        game.setLastValue(1);
        const nextCell = game.getCellWithNextValue();
        expect(nextCell!.value).toBe(2);
    });

    test('gets last value', () => {
        const game = new Game(5).fillBoard(false, 0, 2);
        game.setLastValue(2);
        const nextCell = game.getCellWithNextValue();
        expect(nextCell).toBeUndefined();
    });

    test('checks game over', () => {
        const game = new Game(5);
        expect(game.isOver()).toBeFalsy();
    });

    test('sets game over', () => {
        const game = new Game(5).setFinish();
        expect(game.isOver()).toBeTruthy();
    });

});

describe('Game actions', () => {

    test('player picks correct cell', () => {
        const game = new Game(5).fillBoard(false, 0, 2);
        const result = game.playerPickCell(0);
        expect(result).toBeTruthy();
        expect(game.getCellWithNextValue()!.value).toBe(2);
    });

    test('player picks wrong cell', () => {
        const game = new Game(5).fillBoard(false, 0, 2);
        const result = game.playerPickCell(1);
        expect(result).toBeFalsy();
        expect(game.getCellWithNextValue()!.value).toBe(1);
    });

    test('player picks empty cell', () => {
        const game = new Game(5).fillBoard(false, 0, 2);
        const result = game.playerPickCell(3);
        expect(result).toBeFalsy();
        expect(game.getCellWithNextValue()!.value).toBe(1);
    });

    test('player picks last cell', () => {
        const game = new Game(5).fillBoard(false, 0, 2);
        let result = game.playerPickCell(0);
        expect(result).toBeTruthy();
        expect(game.isOver()).toBeFalsy();
        result = game.playerPickCell(1);
        expect(result).toBeTruthy();
        expect(game.getCellWithNextValue()).toBeUndefined();
        expect(game.isOver()).toBeTruthy();
    });

});
