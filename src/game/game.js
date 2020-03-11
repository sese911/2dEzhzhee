import Loop from "../loop/loop.js"
import Display from "../display/display.js"

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

        this.loop     = new Loop(1000 / this.fps, (dt) => this.update(dt), () => this.render() );

        this.display  = new Display(this.contaner, this.w, this.h);
    }
    
    update(dt) {

    }

    render() {
        this.display.fillBackground(this.bgColor);
        this.display.render();
    }

    start() {
        window.addEventListener("resize", () => this.display.resize());

        this.loop.start();
    }
}