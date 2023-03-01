export default class Hex {
    constructor(x, y, h) {
        this.x = x
        this.y = y
        this.h = h
        this.c = 'rgb(' + Math.floor(Math.random()*255) + ',' +
            Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ')'
        this.v = Math.floor(Math.random()*2*Math.PI)
        this.hp = 3
        this.sp = Math.floor(Math.random()*5) + 1
    }

    get left() {
        return this.x
    }

    get right() {
        return this.x + this.h
    }

    get top() {
        return this.y
    }

    get bottom() {
        return this.y + this.h
    }

    contains(point) {
        return (point.x >= this.x &&
            point.x < this.x + this.h &&
            point.y >= this.y &&
            point.y < this.y + this.h)
    }

    intersects(rect) {
        return (this.x < rect.x + rect.h)
            && (rect.x < this.x + this.h)
            && (this.y < rect.y + rect.h)
            && (rect.y < this.y + this.h)
    }
}