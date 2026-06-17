import {describe, expect, test} from "vitest";
import Board from "../src/board";

describe('board', () => {

    test('checks board size', () => {
        expect(new Board(1).length).toBe(1);
        expect(new Board(25).length).toBe(25);
        expect(new Board(0).length).toBe(0);
    });

    test('writes and reads to cell', () => {
        const board = new Board(10);
        board.getCell(3)!.value = 5;
        expect(board.getCell(3)!.value).toBe(5);
    });

    test('checks initial cell is empty', () => {
        expect(new Board(10).getCell(3)!.isEmpty()).toBeTruthy();
    });

    test('checks out of range', () => {
        expect(new Board(10).getCell(15)).toBeUndefined();
    });

    test('gets empty cell', () => {
        const board = new Board(3);
        expect(board.getRandomEmptyCell()!.isEmpty()).toBeTruthy();
        board.getCell(0)!.value = 0;
        expect(board.getRandomEmptyCell()!.isEmpty()).toBeTruthy();
        board.getCell(2)!.value = 1;
        expect(board.getRandomEmptyCell()!.index).toBe(1);
        board.getCell(1)!.value = 2;
        expect(board.getRandomEmptyCell()).toBeUndefined();
    })

});
