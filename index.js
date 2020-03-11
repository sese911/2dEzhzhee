import Game from "./src/game/game.js"

window.onload = function() {
    let gameEzhzhee = new Game({
        contaner : document.getElementById("contanerEzhzhee")
    });
    
    gameEzhzhee.start();
}