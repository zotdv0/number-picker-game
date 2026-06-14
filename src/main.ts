import Game from "./game";

const boardSide = 5;
const game = new Game(boardSide * boardSide).fillBoard();

const createBoard = (boardElement: HTMLElement) => {
    if (boardElement.childElementCount === 0) {
        boardElement.classList.add(`board-side-${boardSide}`);
        boardElement.style.gridTemplateColumns = `repeat(${boardSide}, 1fr)`;
        boardElement.style.gridTemplateRows = `repeat(${boardSide}, 1fr)`;
        for (let index = 0; index < game.boardSize; ++index) {
            const cellElement = document.createElement("div");
            cellElement.id = "cell_" + index;
            cellElement.className = "cell";
            boardElement.appendChild(cellElement);
        }
    }
    updateBoard(boardElement);
}

const updateBoard = (boardElement: HTMLElement) => {
    for (const cellElement of boardElement.children) {
        if (cellElement instanceof HTMLElement) {
            let index = +cellElement.id.replace('cell_', '');
            let cell = game.getCell(index);
            cellElement.innerText = (cell && cell.value) ? `${cell.value}` : '';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const boardElement = <HTMLElement> document.querySelector("#board");
    createBoard(boardElement);
});
