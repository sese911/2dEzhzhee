import Key from "./key.js";

export default class InputController {
    constructor() {
        this.left  = new Key();
        this.up    = new Key();
        this.right = new Key();
        this.down  = new Key();
        this.space = new Key();
    }

    keyDownUp(e) {
        if (e.repeat) return;

        let keyDown = (e.type == "keydown") ? true : false;

        switch (e.key) {
            case "ArrowLeft" : this.left.getInput(keyDown);  break;
            case "ArrowUp"   : this.up.getInput(keyDown);    break;
            case "ArrowRight": this.right.getInput(keyDown); break;
            case "ArrowDown" : this.down.getInput(keyDown);  break;
            case " "         : this.space.getInput(keyDown); break;
            default : // Ignore other keys.
        }
    }

    handleKeyboard = (e) => this.keyDownUp(e);
}