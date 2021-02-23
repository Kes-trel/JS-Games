document.addEventListener("DOMContentLoaded", () => {

const dino = document.querySelector(".dino")
const grid = document.querySelector(".grid")
const alert = document.getElementById("alert")

let isJumping = false
let gravity = 0.9
let isGameOver = false

function control (e) {
    if (e.keyCode === 32) {
        if (isJumping === false) {
            isJumping = true
            jump ()
        }
    }
}

document.addEventListener("keyup", control);

let position = 0

function jump () {
    let count = 0;
    let timerId = setInterval(function (){
        
        //move down
        if (count === 15) {
            clearInterval(timerId)
            console.log("down");
            let downTimerId = setInterval (function () {
                if (count === 0) {
                    clearInterval(downTimerId)
                    isJumping = false
                }
                position -=5;
                count--
                position = position * gravity
                dino.style.bottom = position + "px"
            },20)
        }
        
        //move up
        console.log("movingup");
        position +=30;
        count++
        position = position * gravity
        dino.style.bottom = position + "px";
        console.log(dino.style.bottom)
    },20)
}

function generateObstacles () {
    let randomTime = Math.random() * 4000
    let obstaclePosition = 1000
    const obstacle = document.createElement("div")
    obstacle.classList.add("obstacle")
    grid.appendChild(obstacle)
    obstacle.style.left = obstaclePosition + "px"

    let timerId = setInterval (function () {
        if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
            clearInterval(timerId)
            alert.innerHTML = "GAME OVER"
            isGameOver = true
        }
        
        
        obstaclePosition -=10
        obstacle.style.left = obstaclePosition + "px"
    },20)
    if (isGameOver === false) setTimeout(generateObstacles, randomTime)
}

generateObstacles()



})