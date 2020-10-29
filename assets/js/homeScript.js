 //Bubble
 var totalBubbles = 15;
 var maxTimeToMove = 1500;
 var minTimeToMove = 1;

 $(document).ready(function () {
     if (totalBubbles == 0)
         totalBubbles = 1;
     var borderWidth = $(".bubble").css("border-left-width").slice(0, -2);

     boundsX = $("#bubbleContainer").width() - $(".bubble").width() - borderWidth;
     boundsY = $("#bubbleContainer").height() - $(".bubble").height() - borderWidth;
     for (i = 0; i < totalBubbles - 1; i++) {
         $("#bubbleContainer").prepend("<div class='bubble'> </div>")
             .prepend("<div class='colbubble'> </div>");
     }
     $(".bubble").css("left", Math.floor(Math.random() * boundsX) + "px");
     $(".colbubble").css("left", Math.floor(Math.random() * boundsX) + "px");

     moveBubbles();
 });

 function moveBubbles() {
     for (var i = 0; i < totalBubbles; i++) {
         var curr = document.getElementsByClassName("bubble")[i];
         var cur = document.getElementsByClassName("colbubble")[i];
         $(cur).animate({
                 left: Math.floor(Math.random() * boundsX),
                 top: Math.floor(Math.floor(Math.random() * (boundsY)))
             },
             Math.floor((Math.random() * maxTimeToMove) + minTimeToMove),
             function () {
                 moveBubbles();
             });
         $(curr).animate({
                 left: Math.floor(Math.random() * boundsX),
                 top: Math.floor(Math.floor(Math.random() * (boundsY)))
             },
             Math.floor((Math.random() * maxTimeToMove) + minTimeToMove),
             function () {
                 moveBubbles();
             });
     }
 }

 //snake 

 $("#snakeGame").click(function () {
     $("#displayGame").css("display", "block");
     $("#snakeGame").css("display", "none");
     let gameCanvas = document.getElementById("gameCanvas");
     let ctx = gameCanvas.getContext("2d");
     let foodX;
     let foodY;
     var dx = 10;
     var dy = 0;
     let changingDirection = false;


     let snake = [{
         x: 150,
         y: 150
     }, {
         x: 140,
         y: 150
     }, {
         x: 130,
         y: 150
     }, {
         x: 120,
         y: 150
     }, {
         x: 110,
         y: 150
     } 
    
];

      
     createFood();
    //  if(snake.length >=6) return  createdimendFood();

     function main() {
         if (didGameEnd()) return;
         setTimeout(function onTick() {
             changingDirection = false;
             clearCanvas();
             advanceSnake();
             drawSnake();
             drawSnakeFood()
            //  dimend();
             // Call game again
             main();
         }, 100)
     }
     main();

     function drawSnake() {
         snake.forEach(drawSnakePart);
     }

     function drawSnakePart(snakePart) {
         ctx.fillStyle = 'lightgreen';
         ctx.strokestyle = 'darkgreen';
         ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
         ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
     }

     function advanceSnake() {
         const head = {
             x: snake[0].x + dx,
             y: snake[0].y + dy
         };
         snake.unshift(head);

         const didSnakeEatFood = snake[0].x === foodX && snake[0].y === foodY;
         if (didSnakeEatFood) {
             createFood();
            //   createdimendFood();
         } else {
             snake.pop();
         }
     }
     //food

     function drawSnakeFood() {
         ctx.fillStyle = "red";
         ctx.strokestyle = "darkred";
         ctx.fillRect(foodX, foodY, 10, 10);
         ctx.strokeRect(foodX, foodY, 10, 10);
     }
    //  function  dimend() {
    //     ctx.fillStyle = "blue";
    //     ctx.strokestyle = "darkblue";
    //     ctx.fillRect(foodX, foodY, 10, 10);
    //     ctx.strokeRect(foodX, foodY, 10, 10);
    // }  
    function randomTen(min, max) {
        return Math.round((Math.random() * (max - min) + min) / 10) * 10;
    }
    //  function createdimendFood() {

    //     foodX = randomTen(0, gameCanvas.width - 10);
    //     foodY = randomTen(0, gameCanvas.height - 10);
    //     snake.forEach(function isFoodOnSnake(part) {
    //         const foodIsoNsnake = part.x == foodX && part.y == foodY;
    //         if (foodIsoNsnake) createFood();
    //     });
    // }

    

     function createFood() {
         foodX = randomTen(0, gameCanvas.width - 10);
         foodY = randomTen(0, gameCanvas.height - 10);
         snake.forEach(function isFoodOnSnake(part) {
             const foodIsoNsnake = part.x == foodX && part.y == foodY;
             if (foodIsoNsnake) createFood();
         });
     }

     function clearCanvas() {
         ctx.fillStyle = "white";
         ctx.strokeStyle = "black";
         ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
         ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
     }

     function snakeMoment(sx, sy) {
         const head = {
             x: snake[0].x * 0 + sx,
             y: snake[0].y * 0 + sy
         };
         snake.unshift(head);
         snake.pop();

     }

     function didGameEnd() {
         for (let i = 4; i < snake.length; i++) {
             if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
         }

         const hitLeftWall = snake[0].x < 0;
         const hitRightWall = snake[0].x > gameCanvas.width - 10;
         const hitToptWall = snake[0].y < 0;
         const hitBottomWall = snake[0].y > gameCanvas.height - 10;
         if (hitLeftWall) return snakeMoment(gameCanvas.width, snake[0].y)
         if (hitRightWall) return snakeMoment(0, snake[0].y)
         if (hitToptWall) return snakeMoment(snake[0].x, gameCanvas.height)
         if (hitBottomWall) return snakeMoment(snake[0].x, 0)

     }

     $(document).keydown(function (e) {
         if (changingDirection) return;
         changingDirection = true;

         const goingUp = dy === -10;
         const goingDown = dy === 10;
         const goingRight = dx === 10;
         const goingLeft = dx === -10;
         if (e.which == '37' && !goingRight) { //left arrow key 
             dx = -10;
             dy = 0;
         } else if (e.which == '38' && !goingDown) { //up arrow key 
             dx = 0;
             dy = -10;

         } else if (e.which == '39' && !goingLeft) { //Right arrow key 
             dx = 10;
             dy = 0;
         } else if (e.which == '40' && !goingUp) { //down arrow key 
             dx = 0;
             dy = 10;
         }

     });
 });