export default class Circle {
    constructor(x, y, h, hp) {
        this.x = x
        this.y = y
        this.h = h
        this.c = 'rgb(' + Math.floor(Math.random()*255) + ',' +
            Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ')'
        this.v = Math.floor(Math.random()*2*Math.PI)
        this.hp = hp
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
            return (
                Math.pow((Math.pow((this.x-fi.x), 2) + Math.pow((this.y-fi.y), 2)), 1/2)<50
            )
        }
        if (fi.constructor.name === "Rectangle") {
            let res = false
            let x1,x2,y1,y2, k, c, dist
            for (let i = 0; i < 4; i++)
            {
                if (i === 0) {x1 = fi.x;  y1 = fi.y;  x2 = fi.x+50;  y2 = fi.y}
                if (i === 1) {x1 = fi.x+50;  y1 = fi.y;  x2 = fi.x+50;  y2 = fi.y+50}
                if (i === 2) {x1 = fi.x+50;  y1 = fi.y+50;  x2 = fi.x;  y2 = fi.y+50}
                if (i === 3) {x1 = fi.x;  y1 = fi.y+50;  x2 = fi.x;  y2 = fi.y}
                k = ((y2-y1)/(x2-x1))
                c = y1 - (k*x1)
                dist = (Math.abs(k*(this.x+25)-this.y-25+c))/(Math.pow(k*k+1,1/2))
                if (dist<25){
                    res = Math.pow((Math.pow((this.x-fi.x), 2) + Math.pow((this.y-fi.y), 2)), 1/2)<71
                    break
                }
            }
            return (res)
        }
        if (fi.constructor.name === "Triangle") {
            let res = false
            let x1,x2,y1,y2, k, c, dist
            for (let i = 0; i < 3; i++)
            {
                if (i === 0) {x1 = fi.x+27;  y1 = fi.y;  x2 = fi.x+54;  y2 = fi.y+50}
                if (i === 1) {x1 = fi.x+54;  y1 = fi.y+50;  x2 = fi.x-4;  y2 = fi.y+50}
                if (i === 2) {x1 = fi.x-4;  y1 = fi.y+50;  x2 = fi.x+27;  y2 = fi.y}
                k = ((y2-y1)/(x2-x1))
                c = y1 - (k*x1)
                dist = (Math.abs(k*(this.x+25)-this.y-25+c))/(Math.pow(k*k+1,1/2))
                if (dist<25){
                    res = Math.pow((Math.pow((this.x-fi.x), 2) + Math.pow((this.y-fi.y), 2)), 1/2)<71
                    break
                }
            }
            return (res)
        }
        if (fi.constructor.name === "Hex") {
            let res = false
            let x1,x2,y1,y2, k, c, dist
            for (let i = 0; i < 6; i++)
            {
                if (i === 0) {x1 = fi.x+25;  y1 = fi.y;  x2 = fi.x+50;  y2 = fi.y+13}
                if (i === 1) {x1 = fi.x+50;  y1 = fi.y+13;  x2 = fi.x+50;  y2 = fi.y+38}
                if (i === 2) {x1 = fi.x+50;  y1 = fi.y+38;  x2 = fi.x+25;  y2 = fi.y+50}
                if (i === 3) {x1 = fi.x+25;  y1 = fi.y+50;  x2 = fi.x;  y2 = fi.y+38}
                if (i === 4) {x1 = fi.x;  y1 = fi.y+38;  x2 = fi.x;  y2 = fi.y+13}
                if (i === 5) {x1 = fi.x;  y1 = fi.y+13;  x2 = fi.x+25;  y2 = fi.y}
                k = ((y2-y1)/(x2-x1))
                c = y1 - (k*x1)
                dist = (Math.abs(k*(this.x+25)-this.y-25+c))/(Math.pow(k*k+1,1/2))
                if (dist<25){
                    res = Math.pow((Math.pow((this.x-fi.x), 2) + Math.pow((this.y-fi.y), 2)), 1/2)<71
                    break
                }
            }
            return (res)
        }
    }
}