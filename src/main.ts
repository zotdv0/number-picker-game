const boardSide = 5;
const createBoard = (boardElement: HTMLElement) => {
    if (boardElement.childElementCount === 0) {
        boardElement.classList.add(`board-side-${boardSide}`);
        boardElement.style.gridTemplateColumns = `repeat(${boardSide}, 1fr)`;
        boardElement.style.gridTemplateRows = `repeat(${boardSide}, 1fr)`;
        for (let index = 0; index < boardSide * boardSide; ++index) {
            const cellElement = document.createElement("div");
            cellElement.id = "cell_" + index;
            cellElement.className = "cell";
            cellElement.innerText = `${index+1}`;
            boardElement.appendChild(cellElement);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const boardElement = <HTMLElement> document.querySelector("#board");
    createBoard(boardElement);
});
