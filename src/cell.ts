export default class Cell {
    readonly index: number;
    protected _value?: number;

    constructor(index: number, value?: number) {
        this.index = index;
        this._value = value;
    }

    get value(): number | undefined {
        return this._value;
    }

    set value(value: number | undefined) {
        this._value = value;
    }

    public isEmpty(): boolean {
        return typeof this._value === "undefined";
    }

    public nextValue(delta: number = 1): number {
        return (this.value || 0) + delta;
    }
}
