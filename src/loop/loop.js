
export default class Loop {
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
            this.update(this.timeStep / 1000); // convert timeStep from milliseconds to seconds
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