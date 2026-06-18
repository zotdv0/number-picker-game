import Game from "./game";
import {GameHTMLView} from "./view.ts";

const rows = 5, cols = 5;
const game = new Game(rows, cols).fillBoard(false, 5,16);

document.addEventListener('DOMContentLoaded', () => {
    let gameElement = document.getElementById('game');
    new GameHTMLView(game).render(gameElement);
});
