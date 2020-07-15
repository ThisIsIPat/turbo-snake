let PIXEL_SIZE = 50;
let GRID_WIDTH = 9;
let GRID_HEIGHT = 9;

// Speed is actually slowness
let SNAKE_START_SPEED = 750;
let SNAKE_END_SPEED = 150;

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
canvas.width = GRID_WIDTH * PIXEL_SIZE;
canvas.height = GRID_HEIGHT * PIXEL_SIZE;

var oldDirection = 'E';
var direction = 'E';
let startX = Math.floor(GRID_WIDTH / 2);
let startY = Math.floor(GRID_HEIGHT / 2);
let snake = [[startX + 1, startY],
            [startX, startY],
            [startX - 1, startY]];
console.log(snake);
var apple = [startX, Math.max(startY - 2, 0)];

document.onkeydown = e => {
    switch(event.which) {
        case 38:
            if (oldDirection != 'S') direction = 'N'
            break;
        case 39:
            if (oldDirection != 'W') direction = 'E'
            break;
        case 40:
            if (oldDirection != 'N') direction = 'S'
            break;
        case 37:
            if (oldDirection != 'E') direction = 'W'
            break;
    }
}

function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    draw(apple[0], apple[1], "red");

    for (let snakeBodyIndex = 0; snakeBodyIndex < snake.length; snakeBodyIndex++) {
        if (snakeBodyIndex == 0) {
            let oldSnakeX = snake[0][0];
            let oldSnakeY = snake[0][1];
            switch(direction) {
                case 'N':
                    snake.unshift([oldSnakeX, ((oldSnakeY <= 0) ? GRID_HEIGHT : oldSnakeY) - 1]);
                    break;
                case 'W':
                    snake.unshift([((oldSnakeX <= 0) ? GRID_WIDTH : oldSnakeX) - 1, oldSnakeY]);
                    break;
                case 'S':
                    snake.unshift([oldSnakeX, ((oldSnakeY >= GRID_HEIGHT - 1) ? 0 : (oldSnakeY + 1))]);
                    break;
                case 'E':
                    snake.unshift([((oldSnakeX >= GRID_WIDTH - 1) ? 0 : oldSnakeX + 1), oldSnakeY]);
                    break;
            }
            oldDirection = direction;
            if (snake[0][0] != apple[0] || snake[0][1] != apple[1]) {
                snake.pop();
            } else {
                if (snake.length == GRID_WIDTH * GRID_HEIGHT) {
                    alert('You won! :) PagChomp');

                    clearInterval(intervalId);
                    return;
                }

                clearInterval(intervalId);
                intervalId = setInterval(tick, SNAKE_END_SPEED + (SNAKE_START_SPEED - SNAKE_END_SPEED) * (1 - snake.length / (GRID_WIDTH * GRID_HEIGHT)) ** 3);

                appleLoop:
                while (true) {
                    for (let appleRespawnSnakeBodyIndex = 0; appleRespawnSnakeBodyIndex < snake.length; appleRespawnSnakeBodyIndex++) {
                        if (snake[appleRespawnSnakeBodyIndex][0] == apple[0] && snake[appleRespawnSnakeBodyIndex][1] == apple[1]) {
                            apple = [Math.floor(Math.random() * GRID_WIDTH), Math.floor(Math.random() * GRID_HEIGHT)];
                            continue appleLoop;
                        }
                    }
                    break;
                }

                draw(apple[0], apple[1], "red");
            }
            var snakeHead = snake[0]
            for (let losingSnakeBodyIndex = 1; losingSnakeBodyIndex < snake.length; losingSnakeBodyIndex++) {
                if (snake[losingSnakeBodyIndex][0] == snakeHead[0] && snake[losingSnakeBodyIndex][1] == snakeHead[1]) {
                    alert('You lost, better luck next time! PepeLaugh');

                    clearInterval(intervalId);
                    return;
                }
            }
        }
        
        let snakeX = snake[snakeBodyIndex][0];
        let snakeY = snake[snakeBodyIndex][1];

        draw(snakeX, snakeY, "black");
    }
}

function draw(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE - 1, PIXEL_SIZE - 1);
}

var intervalId = setInterval(tick, SNAKE_START_SPEED);
tick(); // To start 0ms tick