
export default class Display {
    constructor(contaner, gameWidth, gameHeight) {
        this.contaner = contaner;
        this.WHGameRatio = gameWidth / gameHeight;

        this.buf = document.createElement("canvas").getContext("2d");
        this.buf.canvas.width = gameWidth;
        this.buf.canvas.height = gameHeight;

        this.cnv = document.createElement("canvas");
        this.ctx = this.cnv.getContext("2d");
        
        this.cnv.setAttribute("style", "image-rendering : crisp-edges;");
        
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

        this.ctx.imageSmoothingEnabled = false;
    }
}