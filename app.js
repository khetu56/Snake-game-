//Game constants & Varibale

let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameoversound = new Audio("music/gameover.mp3")
const movesound = new Audio("music/move.mp3");
const musicsound = new Audio("music/music.mp3");
let speed = 9;
let score = 0;
let lastpainttime = 0;
let snakearr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 };



//Game Function
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastpainttime) / 1000 < 1 / speed) {
        return;
    }
    lastpainttime = ctime;
    gameengine();
}

function iscollide(snake) {
    //if you bump into yourself
    for (let i = 1; i < snakearr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    //if you bump into the wall
        if(snake[0].x>=18||snake[0].x<=0 || snake[0].y>=18||snake[0].y<=0) {
            return true;
        }
    return false;


}

function gameengine() {
    //part:1:updadating the array & food
    if (iscollide(snakearr)) {
        gameoversound.play();
        musicsound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over..Please Enter Any Key");
        snakearr = [{ x: 13, y: 15 }];
        musicsound.play();
        score = 0;
    }
    //if you eaten the food,increment the score and regenerate the food
    if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
        foodSound.play();
        score +=1;
        if(score>Highscoreval){
            Highscoreval=score;
            localStorage.getItem("Highscore: ",JSON.stringify(Highscoreval));
            Highscorebox.innerHTML="Highscore :"+Highscoreval;
        }
        scorebox.innerHTML="Score"+score;
        snakearr.unshift({ x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //moving the snake
    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] };
    }
    snakearr[0].x += inputDir.x;
    snakearr[0].y += inputDir.y;

    //part:2:Diplay the snake and food
    //dispaly the snake
    board.innerHTML = " ";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add("head");
        } else {
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });
    //display the food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}







// Main logic starts here


let Hiscore=localStorage.getItem("Hiscore")
if(Hiscore=== null){
    Highscoreval=0;
    localStorage.getItem("Hiscore",JSON.stringify(Highscoreval))
}else{
    Highscoreval=JSON.parse(Hiscore)
    Highscorebox.innerHTML="Highscore: "+Hiscore;
}


window.requestAnimationFrame(main);
window.addEventListener("keydown", e => {
    inputDir = { x: 0, y: 1 } //start the game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;

    }
});