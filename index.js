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
        this.headPos = {x: this.dataPos[0].x, y: this.dataPos[0].y};
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
        if (snake.headPos.x <= 0)
            snake.headPos.x = gridArea.size.width;
        else if (snake.headPos.x > gridArea.size.width)
            snake.headPos.x = 0;
        if (snake.headPos.y <= 0)
            snake.headPos.y = gridArea.size.height;
        else if (snake.headPos.y > gridArea.size.height)
            snake.headPos.y = 0;
    }

    updatePosition()
    {
        this.headPos = this.dataPos[0];
        this.headPos.x += this.velocity.x;
        this.headPos.y += this.velocity.y;

        this.verify();

        for (let i = 0; i <= this.length-1; i++)
        {
            const snake = document.getElementById(`snake${i}`);
            snake.style.gridColumn = this.dataPos[i].x;
            snake.style.gridRow = this.dataPos[i].y;
        }
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

const gridArea = new GridArea();

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
});

const interval = setInterval(() =>
{
    snake.updatePosition();
}, 40);