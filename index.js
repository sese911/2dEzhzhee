import Game from "./src/game/game.js";

window.onload = function() {
    let gameEzhzhee = new Game({
        contaner : document.getElementById("contanerEzhzhee")
    });

    window.addEventListener("keydown", gameEzhzhee.input.handleKeyboard);
    window.addEventListener("keyup", gameEzhzhee.input.handleKeyboard);
    
    gameEzhzhee.start();
}