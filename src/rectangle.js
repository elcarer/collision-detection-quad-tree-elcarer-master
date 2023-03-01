export default class Rectangle {
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
    smartintersects(fi) {
        if (fi.constructor.name === "Circle") {
            let res = false
            let x1,x2,y1,y2, k, c, dist
            for (let i = 0; i < 4; i++)
            {
                if (i === 0) {x1 = this.x;  y1 = this.y;  x2 = this.x+50;  y2 = this.y}
                if (i === 1) {x1 = this.x+50;  y1 = this.y;  x2 = this.x+50;  y2 = this.y+50}
                if (i === 2) {x1 = this.x+50;  y1 = this.y+50;  x2 = this.x;  y2 = this.y+50}
                if (i === 3) {x1 = this.x;  y1 = this.y+50;  x2 = this.x;  y2 = this.y}
                k = ((y2-y1)/(x2-x1))
                c = y1 - (k*x1)
                dist = (Math.abs(k*(fi.x+25)-fi.y-25+c))/(Math.pow(k*k+1,1/2))
                if (dist<25){
                    res = Math.pow((Math.pow((fi.x-this.x), 2) + Math.pow((fi.y-this.y), 2)), 1/2)<71
                    break
                }
            }
            return (res)
        }
        if (fi.constructor.name === "Rectangle") {
            return true
        }
    }
}