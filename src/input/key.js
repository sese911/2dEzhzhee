
export default class Key {
    constructor() {
        this.isDown = false;
        this._active  = false;
    }

    get pressedOnce() {
        if (this._active) {
            this._active = false;
            return true;
        } else {
            return false;
        }
    }

    getInput(keyDown) {
        this._active = this.isDown = keyDown;
    }
}