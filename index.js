window.addEventListener(("load"), () =>
{
    gameArea.style.display = "none";
});

play.addEventListener(("click"), () =>
{
    gameArea.style.display = "grid";
    start_menu.style.display = "none";
    gameArea.innerHTML =
    `
        <div id="food"></div>
        <div class="snake" id="snake0"></div>
    `;
    game();
});

const game = () =>
{

    class Snake
    {
        constructor()
        {
            this.length = 1;
            this.speed = 1;
            this.velocity = {x: 0, y: 0};
            this.dataPos =
            [
                {x: 15, y: 15}
            ];
            this.move =
            {
                up: function() { utils.up() },
                right: function() { utils.right() },
                down: function() { utils.down() },
                left: function() { utils.left() }
            }
        }
    
        verify()
        {
            if (snake.dataPos[this.dataPos.length-1].x <= 0)
                snake.dataPos[this.dataPos.length-1].x = gridArea.size.width;
            else if (snake.dataPos[this.dataPos.length-1].x > gridArea.size.width)
                snake.dataPos[this.dataPos.length-1].x = 0;
            if (snake.dataPos[this.dataPos.length-1].y <= 0)
                snake.dataPos[this.dataPos.length-1].y = gridArea.size.height;
            else if (snake.dataPos[this.dataPos.length-1].y > gridArea.size.height)
                snake.dataPos[this.dataPos.length-1].y = 0;
        }
    
        updatePosition()
        {
            this.verify();
            
            this.dataPos.push({x: this.dataPos[this.dataPos.length-1].x, y: this.dataPos[this.dataPos.length-1].y});
            if (this.dataPos.length > this.length)
                this.dataPos.shift();
            
            // this.headPos = this.dataPos[0];
            this.dataPos[this.dataPos.length-1].x += this.velocity.x;
            this.dataPos[this.dataPos.length-1].y += this.velocity.y;
            
            
            for (let i = 0; i < this.length; i++)
            {
                const snake = document.getElementById(`snake${i}`);
                snake.style.gridColumn = this.dataPos[i].x;
                snake.style.gridRow = this.dataPos[i].y;
            }
    
        }
    
        checkCollision(foodPos)
        {
            return snake.dataPos[this.dataPos.length-1].x == foodPos.x && snake.dataPos[this.dataPos.length-1].y == foodPos.y;
        }
    
        updateLength()
        {
            gameArea.innerHTML +=
            `
                <div class="snake" id="snake${this.length}"></div>
            `;
            this.length++;
        }
    }
    
    const utils =
    {
        up: function()
        {
            if (snake.velocity.y <= 0)
                snake.velocity.y = -1; snake.velocity.x = 0
        },
        right: function()
        {
            if (snake.velocity.x >= 0)
                snake.velocity.x = 1; snake.velocity.y = 0
        },
        down: function()
        {
            if (snake.velocity.y >= 0)
                snake.velocity.y = 1; snake.velocity.x = 0
        },
        left: function()
        {
            if (snake.velocity.x <= 0)
                snake.velocity.x = -1; snake.velocity.y = 0
        }
    }
    
    class GridArea
    {
        constructor()
        {
            this.size = {width: 30, height: 30};
        }
    }
    
    class Food
    {
        constructor()
        {
            this.pos = {x: Math.floor(Math.random()*gridArea.size.width), y: Math.floor(Math.random()*gridArea.size.height)};
        }
    
        updatePosition()
        {
            const food = document.getElementById("food");
            food.style.gridColumn = this.pos.x;
            food.style.gridRow = this.pos.y;
        }
    
        eaten()
        {
            this.pos = {x: Math.floor(Math.random()*gridArea.size.width), y: Math.floor(Math.random()*gridArea.size.height)};
            this.updatePosition();
        }
    }
    
    const gridArea = new GridArea();
    
    const snake = new Snake();
    
    const food = new Food();
    food.updatePosition();
    
    document.addEventListener("keydown", (e) =>
    {
        if (e.key == 'z')
            snake.move.up();
        else if (e.key == 'd')
            snake.move.right();
        else if (e.key == 's')
            snake.move.down();
        else if (e.key == 'q')
            snake.move.left();
        else if (e.key == "Escape")
            clearInterval(interval)
    });
    
    const interval = setInterval(() =>
    {
        if (snake.checkCollision(food.pos))
        {
            snake.updateLength();
            food.eaten();
        }
        snake.updatePosition();
    }, 20);
};