// @vitest-environment happy-dom

import {describe, expect, test} from "vitest";
import Cell from "../src/cell";
import {BoardHTMLView, CellHTMLView, GameHTMLView} from "../src/view";
import Board from "../src/board";
import Game from "../src/game";

describe('CellHTMLView', () => {

    test('checks id', () => {
        const cell = new Cell(1);
        const cellView = new CellHTMLView(cell);
        expect(cellView.id).toBe(`cell_1`);
    });

    test('checks empty value', () => {
        const cell = new Cell(0);
        const cellElement = new CellHTMLView(cell).render();
        expect(cellElement.innerText).toBe('');
    });

    test('checks filled value', () => {
        const cell = new Cell(0, 3);
        const cellElement = new CellHTMLView(cell).render();
        expect(cellElement.innerText).toBe('3');
    });

    test('checks attributes', () => {
        const cell = new Cell(2, 4);
        const cellElement = new CellHTMLView(cell).render();
        expect(cellElement.id).contains('2');
        expect(Array.from(cellElement.classList)).contains('cell');
        expect(cellElement.dataset.index).toBe('2');
        expect(cellElement.dataset.value).toBe('4');
    });

    test('replaces cell', () => {
        const cell = new Cell(2, 4);
        const cellView = new CellHTMLView(cell);
        let cellElement = cellView.render();
        cell.value = 5;
        cellElement = cellView.render(cellElement);
        expect(cellElement.id).toBe('cell_2');
        expect(cellElement.dataset.index).toBe('2');
        expect(cellElement.innerText).toBe('5');
        expect(cellElement.dataset.value).toBe('5');
    });

});

describe('BoardHTMLView', () => {

    test('checks attributes', () => {
        const board = new Board(5);
        const boardElement = new BoardHTMLView(board).render();
        expect(boardElement.id).toBe('board');
        expect(boardElement.dataset.size).toBe('5');
    });

    test('checks cells', () => {
        const board = new Board(5);
        const boardElement = new BoardHTMLView(board).render();
        expect(boardElement.children).toHaveLength(5);
        for (let i = 0; i < 5; ++i) {
            expect(boardElement.children[i]?.id).toBe(`cell_${i}`);
        }
    });

});

describe('GameHTMLView', () => {

    test('checks attributes', () => {
        const game = new Game(5);
        const gameElement = new GameHTMLView(game).render();
        expect(gameElement.id).toBe('game');
    });

    test('checks elements', () => {
        const game = new Game(5);
        const gameElement = new GameHTMLView(game).render();
        expect(gameElement.querySelector('#board')).toBeInstanceOf(HTMLElement);
    });

});
