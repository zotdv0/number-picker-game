import {describe, expect, test} from "vitest";
import Board from "../src/board";

describe('board common', () => {

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

});

describe('board lookup', ()  => {

    test('gets empty cell', () => {
        const board = new Board(3);
        expect(board.getRandomEmptyCell()!.isEmpty()).toBeTruthy();
        board.getCell(0)!.value = 0;
        expect(board.getRandomEmptyCell()!.isEmpty()).toBeTruthy();
        board.getCell(2)!.value = 1;
        expect(board.getRandomEmptyCell()!.index).toBe(1);
        board.getCell(1)!.value = 2;
        expect(board.getRandomEmptyCell()).toBeUndefined();
    });

    test('finds first cell', () => {
        const board = new Board(1);
        board.getCell(0)!.value = 5;
        expect(board.findCellAfter()!.value).toBe(5);
    });

    test('finds first cell in board with empty cells', () => {
        const board = new Board(5);
        board.getCell(3)!.value = 5;
        expect(board.findCellAfter()!.value).toBe(5);
    });

    test('finds minimal cell', () => {
        const board = new Board(5);
        board.getCell(0)!.value = 6;
        board.getCell(1)!.value = 3;
        board.getCell(3)!.value = 2;
        board.getCell(4)!.value = 5;
        expect(board.findCellAfter()!.value).toBe(2);
    });

    test('finds no cell in empty board', () => {
        const board = new Board(5);
        expect(board.findCellAfter()).toBeUndefined();
    });

    test('finds cell with equal value', () => {
        const board = new Board(3);
        board.getCell(0)!.value = 1;
        board.getCell(1)!.value = 2;
        board.getCell(2)!.value = 4;
        expect(board.findCellAfter(2)!.value).toBe(2);
    });

    test('finds cell with greater value', () => {
        const board = new Board(3);
        board.getCell(0)!.value = 1;
        board.getCell(1)!.value = 2;
        board.getCell(2)!.value = 4;
        expect(board.findCellAfter(3)!.value).toBe(4);
    });

    test('finds no cell with exceeded value', () => {
        const board = new Board(3);
        board.getCell(0)!.value = 1;
        board.getCell(1)!.value = 2;
        board.getCell(2)!.value = 4;
        expect(board.findCellAfter(5)).toBeUndefined();
    });

});
