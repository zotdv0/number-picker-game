import Game from "./game";
import {GameHTMLView} from "./view.ts";
import Params from "./params.ts";

const params = new Params();
params.randomOrder = false;
params.filledCells = 16;
const game = Game.fromParams(params);

document.addEventListener('DOMContentLoaded', () => {
    let gameElement = document.getElementById('game');
    new GameHTMLView(game).render(gameElement);
});
