import Rectangle from "./rectangle.js"
import Circle from "./circle.js"
import Triangle from "./Triangle.js"
import Hex from "./hex.js"
/*"type": "module",*/
const canvas = document.getElementById("cnvs")

const gameState = {figure:[]}
const timeState = {hp:3}

function load () {
    for (let i = 0; i < 1000; i++){
        gameState.figure.push(new Circle(Math.random() * canvas.width, Math.random() * canvas.height, 50, timeState.hp))
        gameState.figure.push(new Rectangle(Math.random() * canvas.width, Math.random() * canvas.height, 50, timeState.hp))
        gameState.figure.push(new Triangle(Math.random() * canvas.width, Math.random() * canvas.height, 50, timeState.hp))
        gameState.figure.push(new Hex(Math.random() * canvas.width, Math.random() * canvas.height, 50, timeState.hp))
    }
    run()
}

function queueUpdates(numTicks) {
    for (let i = 0; i < numTicks; i++) {
        timeState.lastTick = timeState.lastTick + timeState.tickLength
        update(timeState.lastTick)
    }
}

function draw(tFrame) {
    const context = canvas.getContext('2d');
    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height)
    // draw
    gameState.figure.forEach(element => {
        if (element.constructor.name === "Rectangle") {
            context.beginPath()
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
    gameState.figure.forEach((element, i1) => {
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
        gameState.figure.forEach((element2, i2) => {
            let stop = false
            if ((element !== element2)&&(element.intersects(element2))&&(stop===false)){
                if (element.smartintersects(element2)) {
                    /*let i1 = gameState.figure.indexOf(element)
                    let i2 = gameState.figure.indexOf(element2)*/
                    let v1 = element.v
                    element.v = element2.v
                    element2.v = v1
                    element.hp--
                    element2.hp--
                    gameState.figure[i1].c = 'rgb(' + Math.floor(Math.random() * 255) + ',' +
                        Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')'
                    gameState.figure[i2].c = 'rgb(' + Math.floor(Math.random() * 255) + ',' +
                        Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')'
                    /*console.log(gameState.figure.indexOf(element))
                    console.log(i1)*/
                    if (element.hp < 1) {
                        gameState.figure.splice(i1, 1)
                    }
                    i2 = gameState.figure.indexOf(element2)
                    if (element2.hp < 1) {
                        gameState.figure.splice(i2, 1)
                    }
                    stop = true
                }
            }
        })
    })

}

function run(tFrame) {
    timeState.stopCycle = window.requestAnimationFrame(run)

    const nextTick = timeState.lastTick + timeState.tickLength
    let numTicks = 0

    if (tFrame > nextTick) {
        const timeSinceTick = tFrame - timeState.lastTick
        numTicks = Math.floor(timeSinceTick / timeState.tickLength)
    }
    queueUpdates(numTicks)
    draw(tFrame)
    timeState.lastRender = tFrame
}

function setup() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    timeState.lastTick = performance.now()
    timeState.lastRender = timeState.lastTick
    timeState.tickLength = 15 //ms
    load ()
}

setup()

