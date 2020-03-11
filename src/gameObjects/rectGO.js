import GameObject from "./gameObject.js";
import Vec2 from "../math/vec2.js";

export default class RectGO extends GameObject {
    constructor(x, y, width, height) {
        super(x, y);
        this.size = new Vec2(width, height); 
    }

    get top()    { return this.pos.y; }
    get right()  { return this.pos.x + this.size.x; }
    get bottom() { return this.pos.y + this.size.y; }
    get left()   { return this.pos.x; }

    get centerX() { return this.pos.x + this.size.x / 2; }
    get centerY() { return this.pos.y + this.size.y / 2; }

    update(dt) {
        super.move(dt);
    }

    draw(target) {
        target.fillStyle = this.color;
        target.fillRect( Math.trunc(this.pos.x), Math.trunc(this.pos.y), this.size.x, this.size.y );
    }
}