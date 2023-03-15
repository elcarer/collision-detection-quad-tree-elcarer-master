export default class Rectangle {
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
        if (fi.constructor.name === "Triangle") {
            let res = false
            let x1,x2,y1,y2, k, c, rx, ry
            outer: for (let i = 0; i < 4; i++)
            {
                if (i === 0) {x1 = this.x;  y1 = this.y;  x2 = this.x+50;  y2 = this.y}
                if (i === 1) {x1 = this.x+50;  y1 = this.y;  x2 = this.x+50;  y2 = this.y+50}
                if (i === 2) {x1 = this.x+50;  y1 = this.y+50;  x2 = this.x;  y2 = this.y+50}
                if (i === 3) {x1 = this.x;  y1 = this.y+50;  x2 = this.x;  y2 = this.y}
                k = ((y2-y1)/(x2-x1))
                c = y1 - (k*x1)
                let x11,x22,y11,y22, k1, c1
                for (let i1 = 0; i1 < 3; i1++) {
                    if (i1 === 0) {
                        x11 = fi.x+27;
                        y11 = fi.y;
                        x22 = fi.x + 54;
                        y22 = fi.y+50
                    }
                    if (i1 === 1) {
                        x11 = fi.x + 54;
                        y11 = fi.y+50;
                        x22 = fi.x -4;
                        y22 = fi.y + 50
                    }
                    if (i1 === 2) {
                        x11 = fi.x -4;
                        y11 = fi.y + 50;
                        x22 = fi.x+27;
                        y22 = fi.y
                    }
                    k1 = ((y22-y11)/(x22-x11))
                    c1 = y11 - (k1*x11)
                    if (k!==k1)
                    {
                        rx = (c1 - c)/(k - k1)
                            ry = k*rx + c
                        rx = Math.floor(rx)
                        ry = Math.floor(ry)
                        x1 = Math.floor(x1)
                        x2 = Math.floor(x2)
                        y1 = Math.floor(y1)
                        y2 = Math.floor(y2)
                        x11 = Math.floor(x11)
                        x22 = Math.floor(x22)
                        y11 = Math.floor(y11)
                        y22 = Math.floor(y22)

                        if (((rx>=Math.min(x1, x2))&&(rx<=Math.max(x1, x2)))&&((ry>=Math.min(y1, y2))&&(ry<=Math.max(y1, y2))))
                        {
                            if (((rx>=Math.min(x11, x22))&&(rx<=Math.max(x11, x22)))&&((ry>=Math.min(y11, y22))&&(ry<=Math.max(y11, y22))))
                        {

                            res = true
                            break
                            break outer
                        }}
                    }
                }
            }
            return (res)
        }
        if (fi.constructor.name === "Hex") {
            let res = false
            let x1,x2,y1,y2, k, c, rx, ry
            outer: for (let i = 0; i < 6; i++)
            {
                if (i === 0) {x1 = fi.x+25;  y1 = fi.y;  x2 = fi.x+50;  y2 = fi.y+13}
                if (i === 1) {x1 = fi.x+50;  y1 = fi.y+13;  x2 = fi.x+50;  y2 = fi.y+38}
                if (i === 2) {x1 = fi.x+50;  y1 = fi.y+38;  x2 = fi.x+25;  y2 = fi.y+50}
                if (i === 3) {x1 = fi.x+25;  y1 = fi.y+50;  x2 = fi.x;  y2 = fi.y+38}
                if (i === 4) {x1 = fi.x;  y1 = fi.y+38;  x2 = fi.x;  y2 = fi.y+13}
                if (i === 5) {x1 = fi.x;  y1 = fi.y+13;  x2 = fi.x+25;  y2 = fi.y}
                k = ((y2-y1)/(x2-x1))
                c = y1 - (k*x1)
                let x11,x22,y11,y22, k1, c1
                for (let i1 = 0; i1 < 4; i1++) {
                    if (i1 === 0) {
                        x11 = this.x;
                        y11 = this.y;
                        x22 = this.x + 50;
                        y22 = this.y
                    }
                    if (i1 === 1) {
                        x11 = this.x + 50;
                        y11 = this.y+0;
                        x22 = this.x +50;
                        y22 = this.y + 50
                    }
                    if (i1 === 2) {
                        x11 = this.x +50;
                        y11 = this.y+50;
                        x22 = this.x;
                        y22 = this.y+50
                    }
                    if (i1 === 3) {
                        x11 = this.x;
                        y11 = this.y + 50;
                        x22 = this.x;
                        y22 = this.y
                    }
                    k1 = ((y22-y11)/(x22-x11))
                    c1 = y11 - (k1*x11)
                    if (k!==k1)
                    {
                        rx = (c1 - c)/(k - k1)
                        ry = k*rx + c
                        rx = Math.floor(rx)
                        ry = Math.floor(ry)
                        x1 = Math.floor(x1)
                        x2 = Math.floor(x2)
                        y1 = Math.floor(y1)
                        y2 = Math.floor(y2)
                        x11 = Math.floor(x11)
                        x22 = Math.floor(x22)
                        y11 = Math.floor(y11)
                        y22 = Math.floor(y22)

                        if (((rx>=Math.min(x1, x2))&&(rx<=Math.max(x1, x2)))&&((ry>=Math.min(y1, y2))&&(ry<=Math.max(y1, y2))))
                        {if (((rx>=Math.min(x11, x22))&&(rx<=Math.max(x11, x22)))&&((ry>=Math.min(y11, y22))&&(ry<=Math.max(y11, y22))))
                        {
                            res = true
                            break
                            break outer
                        }}
                    }
                }
            }
            return (res)
        }
    }
}