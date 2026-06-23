import type Cell from "./cell.ts";
import type Board from "./board.ts";
import type Game from "./game.ts";

type nullOrUndefined = undefined | null;

interface View<T> {
    render(oldValue: T | nullOrUndefined): T;
}

interface HTMLView extends View<HTMLElement> {
    get id(): string;
}

class CellHTMLView implements HTMLView {
    protected cell: Cell;

    constructor(cell: Cell) {
        this.cell = cell;
    }

    get id(): string {
        return `cell_${this.cell.index}`;
    }

    render(oldValue?: HTMLElement | nullOrUndefined) {
        if (!oldValue) {
            oldValue = document.createElement("div");
            oldValue.className = "cell";
            oldValue.id = this.id;
            oldValue.dataset.index = `${this.cell.index}`;
        }
        if (oldValue.id === this.id) {
            const text = `${this.cell.value ?? ''}`;
            oldValue.textContent = text;
            oldValue.dataset.value = text;
        }
        return oldValue;
    }
}

class BoardHTMLView implements HTMLView {
    protected board: Board;

    constructor(board: Board) {
        this.board = board;
    }

    get id(): string {
        return 'board';
    }

    render(oldValue?: HTMLElement | nullOrUndefined) {
        if (oldValue && oldValue.dataset.size !== `${this.board.length}`) {
            oldValue.parentElement?.removeChild(oldValue);
            oldValue = undefined;
        }
        if (!oldValue) {
            oldValue = document.createElement("div");
            oldValue.className = "board";
            oldValue.id = this.id;
            oldValue.dataset.size = `${this.board.length}`;
        }
        for (let index = 0; index < this.board.length; index++) {
            const cellView = new CellHTMLView(this.board.getCell(index) as Cell);
            const cellElement = cellView.render(document.getElementById(cellView.id));
            if (!cellElement.parentElement || cellElement.parentElement.id !== this.id) {
                oldValue.appendChild(cellElement);
            }
        }
        return oldValue;
    }
}

class NextCellHTMLView implements HTMLView {
    protected cell: Cell;

    constructor(cell: Cell) {
        this.cell = cell;
    }

    get id(): string {
        return 'next_cell';
    }

    render(oldValue?: HTMLElement | nullOrUndefined) {
        oldValue = oldValue || document.getElementById(this.id);
        if (!oldValue) {
            oldValue = document.createElement("div");
            oldValue.className = "next-cell";
            oldValue.id = this.id;
        }
        oldValue.dataset.nextValue = `${this.cell?.value ?? ''}`;
        oldValue.innerText = `${this.cell?.value ?? ''}`;
        return oldValue;
    }
}

class StatusHTMLView implements HTMLView {
    protected isOver: boolean;

    constructor(isOver: boolean) {
        this.isOver = isOver;
    }

    get id(): string {
        return 'status';
    }

    render(oldValue?: HTMLElement | nullOrUndefined) {
        oldValue = oldValue || document.getElementById(this.id);
        if (!oldValue) {
            oldValue = document.createElement("div");
            oldValue.className = "status";
            oldValue.id = this.id;
        }
        oldValue.dataset.isOver = this.isOver ? '1' : '0';
        oldValue.innerText = this.isOver ? 'Game over' : '';
        return oldValue;
    }
}

class GameHTMLView implements HTMLView {
    protected game: Game;

    constructor(game: Game) {
        this.game = game;
    }

    get id(): string {
        return 'game';
    }

    renderNextCell() {
        const nextCell = this.game.getCellWithNextValue();
        if (nextCell) {
            const nextView = new NextCellHTMLView(nextCell);
            return nextView.render(document.getElementById(nextView.id));
        }
    }

    renderStatus() {
        const isOver = this.game.isOver();
        const statusView = new StatusHTMLView(isOver);
        return statusView.render(document.getElementById(statusView.id));
    }

    render(oldValue?: HTMLElement | nullOrUndefined) {
        oldValue = oldValue || document.getElementById(this.id);
        if (!oldValue) {
            oldValue = document.createElement("div");
            oldValue.className = "game";
            oldValue.id = this.id;
        }
        const boardView = new BoardHTMLView(this.game.getBoard());
        const boardElement = boardView.render(document.getElementById(boardView.id));
        boardElement.dataset.cols = `${this.game.columns}`;
        boardElement.dataset.rows = `${this.game.rows}`;
        if (!boardElement.parentElement || boardElement.parentElement.id !== this.id) {
            oldValue.appendChild(boardElement);
        }
        const nextElement = this.renderNextCell();
        if (nextElement) {
            oldValue.appendChild(nextElement);
        }
        const statusElement = this.renderStatus();
        if (statusElement) {
            oldValue.appendChild(statusElement);
        }
        for (const cellElement of boardElement.querySelectorAll('.cell')) {
            cellElement.addEventListener('click', (evt) => {
                const target = evt.target as HTMLDivElement;
                const index = +(target.dataset.index as string);
                this.game.playerPickCell(index);
                this.renderNextCell();
                this.renderStatus();
            });
        }
        return oldValue;
    }
}

export { CellHTMLView, BoardHTMLView, NextCellHTMLView, StatusHTMLView, GameHTMLView };
