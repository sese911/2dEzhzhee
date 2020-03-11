import Loop from "../loop/loop.js";
import InputController from "../input/inputController.js";
import Display from "../display/display.js";
import RectGO from "../gameObjects/rectGO.js";

export default class Game {
    constructor(cfg) {
        this.contaner = cfg.contaner || document.getElementsByTagName("body");
        this.tileSize = cfg.tileSize || 16;
        this.columns  = cfg.columns || 12;
        this.rows     = cfg.rows || 9;
        this.w        = this.columns * this.tileSize;
        this.h        = this.rows * this.tileSize;        
        this.bgColor  = cfg.backgroundColor || "aqua";
        this.fps      = cfg.fps || 30;

        this.loop    = new Loop(1000 / this.fps, (dt) => this.update(dt), () => this.render() );
        this.input   = new InputController();
        this.display = new Display(this.contaner, this.w, this.h);

        this.testRectGO = new RectGO(30, 30, 16, 16);
    }
    
    update(dt) {
        if (this.input.right.isDown) this.testRectGO.vel.x += 10;
        if (this.input.down.isDown)  this.testRectGO.vel.y += 10;
        if (this.input.left.isDown)  this.testRectGO.vel.x -= 10;
        if (this.input.up.isDown)    this.testRectGO.vel.y -= 10;

        this.testRectGO.vel.mulByNum(0.9);
        this.testRectGO.update(dt);
    }

    render() {
        this.display.fillBackground(this.bgColor);
        this.testRectGO.draw(this.display.buf);
        
        this.display.render();
    }

    start() {
        window.addEventListener("resize", () => this.display.resize());

        this.loop.start();
    }
}