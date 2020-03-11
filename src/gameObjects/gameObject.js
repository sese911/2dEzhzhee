import Vec2 from "../math/vec2";

export default class GameObject {
    constructor(x, y) {
        this.pos = new Vec2(x, y);
        this.vel = new Vec2();
        this.color = "red";
    }

    move() {
        this.pos.add(this.vel);
    }
}