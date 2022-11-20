class Snake
{
    constructor()
    {
        this.length = 1;
        this.speed = 1;
        this.velocity = {x: 0, y: 0};
        this.pos =
        [
            {x: 0, y: 0}
        ];
        this.move =
        {
            up: function() { utils.up() },
            right: function() { utils.right() },
            down: function() { utils.down() },
            left: function() { utils.left() }
        }
    }

    updatePosition()
    {
        
        this.pos[0].x += this.velocity.x;
        this.pos[0].y += this.velocity.y;

        for (let i = 0; i <= this.length-1; i++)
        {
            const snake = document.getElementById(`snake${i}`);
            snake.style.gridColumn = this.pos[i].x;
            snake.style.gridRow = this.pos[i].y;
        }
    }
}

const utils =
{
    up: function() { snake.velocity.y = -1; snake.velocity.x = 0 },
    right: function() { snake.velocity.x = 1; snake.velocity.y = 0 },
    down: function() { snake.velocity.y = 1; snake.velocity.x = 0 },
    left: function() { snake.velocity.x = -1; snake.velocity.y = 0 }
}

gameArea.innerHTML =
`
    <div class="snake" id="snake0"></div>
`;

let snake = new Snake();

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
    else if (e.key == 'e')
        interv
});

const interval = setInterval(() =>
{
    snake.updatePosition();
}, 50);