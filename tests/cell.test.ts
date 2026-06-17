import {describe, expect, test} from "vitest";
import Cell from "../src/cell";

describe('cell index', () => {

    test('gets cell index', () => {
        expect(new Cell(2).index).toBe(2);
    });

});

describe('cell value manipulation', () => {

    test('gets cell value', () => {
        const cell = new Cell(1, 5);
        expect(cell.value).toBe(5);
    });

    test('sets cell value', () => {
        const cell = new Cell(1, 5);
        cell.value = 4;
        expect(cell.value).toBe(4);
        expect(cell.isEmpty()).toBeFalsy();
    });

    test('clears cell value', () => {
        const cell = new Cell(1, 5);
        cell.value = undefined;
        expect(cell.isEmpty()).toBeTruthy();
    });

});

describe('next cell values', () => {

    test('gets first cell value', () => {
        const cell = new Cell(1);
        expect(cell.nextValue()).toBe(1);
    });
    test('gets next cell value', () => {
        const cell = new Cell(1, 5);
        expect(cell.nextValue()).toBe(6);
    });
    test('gets first cell value with delta', () => {
        const cell = new Cell(1);
        expect(cell.nextValue(3)).toBe(3);
    });
    test('gets next cell value with delta', () => {
        const cell = new Cell(1, 5);
        expect(cell.nextValue(3)).toBe(8);
    });

});
