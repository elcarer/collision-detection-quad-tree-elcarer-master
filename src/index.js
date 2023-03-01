import Rectangle from "./rectangle.js";
import Circle from "./circle.js";
import Triangle from "./Triangle.js";
import Hex from "./hex.js";
/*"type": "module",*/
const canvas = document.getElementById("cnvs");

const gameState = {figure:[]};

function load () {
    for (let i = 0; i < 10; i++){
        gameState.figure.push(new Circle(Math.random() * canvas.width, Math.random() * canvas.height, 50));
        gameState.figure.push(new Rectangle(Math.random() * canvas.width, Math.random() * canvas.height, 50));
        /*gameState.figure.push(new Triangle(Math.random() * canvas.width, Math.random() * canvas.height, 50));
        gameState.figure.push(new Hex(Math.random() * canvas.width, Math.random() * canvas.height, 50));*/
    }
    }

function queueUpdates(numTicks) {
    for (let i = 0; i < numTicks; i++) {
        gameState.lastTick = gameState.lastTick + gameState.tickLength
        update(gameState.lastTick)
    }
}

function draw(tFrame) {
    const context = canvas.getContext('2d');
    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height)
    // draw
    gameState.figure.forEach(element => {
        if (element.constructor.name === "Rectangle") {

            context.rect(element.x, element.y, element.h, element.h)
            context.fillStyle = element.c
            context.fill()
        }
        if (element.constructor.name === "Circle") {
            context.beginPath()
            context.arc(element.x+25, element.y+25, element.h/2, 0, Math.PI*2);
            context.fillStyle = element.c
            context.fill()
        }
        if (element.constructor.name === "Triangle") {
            context.beginPath()
            context.moveTo(element.x + 29, element.y)
            context.lineTo(element.x + 58, element.y + 50)
            context.lineTo(element.x, element.y + 50)
            context.lineTo(element.x + 29, element.y)
            context.fillStyle = element.c
            context.fill()
        }
        if (element.constructor.name === "Hex") {
            context.beginPath()
            context.moveTo(element.x + 25, element.y)
            context.lineTo(element.x + 50, element.y + 13)
            context.lineTo(element.x + 50, element.y + 38)
            context.lineTo(element.x + 25, element.y + 50)
            context.lineTo(element.x, element.y + 38)
            context.lineTo(element.x, element.y + 13)
            context.lineTo(element.x + 25, element.y)
            context.fillStyle = element.c
            context.fill()
        }
    })
}

function update(tick) {
    gameState.figure.forEach(element => {
        let el = element
        element.x += Math.cos(element.v) * element.sp
        element.y += Math.sin(element.v) * element.sp
        if (element.x > canvas.width){
            element.x = 0
        }
        if (element.x < 0){
            element.x = canvas.width
        }
        if (element.y > canvas.height){
            element.y = 0
        }
        if (element.y < 0){
            element.y = canvas.height
        }
        gameState.figure.forEach(element => {
            let stop = false
            if ((el !== element)&&(el.intersects(element))&&(stop===false)){
                if (el.smartintersects(element)) {
                    let i1, i2
                    i1 = gameState.figure.indexOf(el)
                    i2 = gameState.figure.indexOf(element)
                    let v1 = el.v
                    el.v = element.v
                    element.v = v1
                    el.hp--
                    element.hp--
                    el.c = 'rgb(' + Math.floor(Math.random() * 255) + ',' +
                        Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')'
                    element.c = 'rgb(' + Math.floor(Math.random() * 255) + ',' +
                        Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')'
                    if (el.hp < 1) {
                        gameState.figure.splice(i1, 1)
                    }
                    if (element.hp < 1) {
                        gameState.figure.splice(i2, 1)
                    }
                    stop = true
                }
            }
        })
    })

}

function run(tFrame) {
    gameState.stopCycle = window.requestAnimationFrame(run)

    const nextTick = gameState.lastTick + gameState.tickLength
    let numTicks = 0

    if (tFrame > nextTick) {
        const timeSinceTick = tFrame - gameState.lastTick
        numTicks = Math.floor(timeSinceTick / gameState.tickLength)
    }
    queueUpdates(numTicks)
    draw(tFrame)
    gameState.lastRender = tFrame
}

function stopGame(handle) {
    window.cancelAnimationFrame(handle);
}

function setup() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    gameState.lastTick = performance.now()
    gameState.lastRender = gameState.lastTick
    gameState.tickLength = 15 //ms
    load ()
}

setup();
run();
