
// LOOP //
class Loop {
    constructor(timeStep, update, render) {
        this.afr = null // Reference to the Animation Frame Request.
        this.timeStamp = null; // The most recent timestamp of loop execution.
        this.elapsedTime = 0; // Time elapsed sinse the last update.
        this.timeStep = timeStep; // Fixed time for update calculation.

        this.updated = false // Whether the update function was called since the last loop.

        this.update = update; // The update function
        this.render = render; // The render function
    }

    run(frameTime) {
        this.afr = window.requestAnimationFrame( (t) => this.run(t) );

        this.elapsedTime += frameTime - this.timeStamp;
        this.timeStamp = frameTime;

        while (this.elapsedTime >= this.timeStep) {
            this.elapsedTime -= this.timeStep;
            this.update(this.timeStep);
            this.updated = true;
        }

        if (this.updated) {
            this.updated = false;
            this.render();
        }
    }

    start() {
        this.elapsedTime = this.timeStep;
        this.timeStamp = window.performance.now();
        this.run(this.timeStamp);
    }

    stop() {
        window.cancelAnimationFrame(this.afr);
    }
}

// DISPLAY //
class Display {
    constructor(contaner, gameWidth, gameHeight) {
        this.contaner = contaner;
        this.WHGameRatio = gameWidth / gameHeight;

        this.buf = document.createElement("canvas").getContext("2d");
        this.buf.canvas.width = gameWidth;
        this.buf.canvas.height = gameHeight;

        this.cnv = document.createElement("canvas");
        this.cnv.setAttribute("style", "image-rendering : pixelated;");
        this.ctx = this.cnv.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        contaner.appendChild(this.cnv);

        this.resize();
    }

    fillBackground(color) {
        this.buf.fillStyle = color;
        this.buf.fillRect(0, 0, this.buf.canvas.width, this.buf.canvas.height);
    }

    render() {
        this.ctx.drawImage(
            this.buf.canvas,
            0, 0, this.buf.canvas.width, this.buf.canvas.height,
            0, 0, this.cnv.width, this.cnv.height
        );
    }

    resize() {
        if (this.contaner.clientWidth / this.contaner.clientHeight > this.WHGameRatio) {
            this.cnv.width  = this.contaner.clientHeight * this.WHGameRatio;
            this.cnv.height = this.contaner.clientHeight;
        } else {
            this.cnv.width  = this.contaner.clientWidth;
            this.cnv.height = this.contaner.clientWidth / this.WHGameRatio;
        }
    }
}

// GAME //
class Game {
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

        //this.display.resize();
        this.loop.start();
    }
}