window.addEventListener("load", () =>
{
    display.start();
});

let interval = null;

const game = () =>
{
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
        {
            clearInterval(interval)
            display.end();
        }
    });

    food.updatePosition();

    interval = setInterval(() =>
    {
        if (snake.checkCollision(food.pos))
        {
            snake.updateLength();
            food.eaten();
        }
        snake.updatePosition();
    }, 50);
};

const display =
{
    start: function()
    {
        end_menu.style.display = "none";
        gameArea.style.display = "none";
        start_menu.style.display = "block";
    },

    gameArea: function()
    {
        gameArea.style.display = "grid";
        menu.style.display = "none";
        gameArea.innerHTML =
        `
            <div id="food"></div>
            <div class="snake" id="snake0"></div>
        `;
        game();
    },

    end: function()
    {
        start_menu.style.display = "none";
        gameArea.style.display = "none";
        menu.style.display = "flex";
        end_menu.style.display = "block";

        hight_score_input.textContent = snake.getHightScore();
        score_input.textContent = snake.getScore();
    }
};

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

    #verify()
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

    #display()
    {
        for (let i = 0; i < this.length; i++)
        {
            const snake = document.getElementById(`snake${i}`);
            snake.style.gridColumn = this.dataPos[i].x;
            snake.style.gridRow = this.dataPos[i].y;
        }
    }

    updatePosition()
    {
        this.#verify();

        this.dataPos.push({x: this.dataPos[this.dataPos.length-1].x, y: this.dataPos[this.dataPos.length-1].y});
        if (this.dataPos.length > this.length)
            this.dataPos.shift();
        
        // this.headPos = this.dataPos[0];
        this.dataPos[this.dataPos.length-1].x += this.velocity.x;
        this.dataPos[this.dataPos.length-1].y += this.velocity.y;

        this.#display();

        for (let i = 0; i < this.length-1; i++)
        {
            if (this.checkCollision(this.dataPos[i]))
            {
                clearInterval(interval);
                document.getElementById(`snake${this.length-1}`).style.backgroundColor = "red";
                setTimeout(() => {
                    display.end();
                }, 1000);
            }
        }
    }
    
    checkCollision(rect)
    {
        return snake.dataPos[this.dataPos.length-1].x == rect.x && snake.dataPos[this.dataPos.length-1].y == rect.y;
    }

    updateLength()
    {
        gameArea.innerHTML +=
        `
            <div class="snake" id="snake${this.length}"></div>
        `;
        this.length++;
    }

    getScore()
    {
        return this.length;
    }

    getHightScore()
    {
        if (localStorage.length == 0)
            localStorage.setItem("hight_score", this.length);

        if (localStorage.getItem("hight_score") < this.length)
        {
            localStorage.setItem("hight_score", this.length);
            return this.length;
        }
        else
        {
            return localStorage.getItem("hight_score");
        }
    }

    async reset()
    {
        this.length = 1;
        this.speed = 1;
        this.velocity = {x: 0, y: 0};
        this.dataPos =
        [
            {x: 15, y: 15}
        ];
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
        this.pos = {x: Math.ceil(Math.random()*gridArea.size.width), y: Math.ceil(Math.random()*gridArea.size.height)};
    }

    updatePosition()
    {
        const food = document.getElementById("food");
        food.style.gridColumn = this.pos.x;
        food.style.gridRow = this.pos.y;
    }

    eaten()
    {
        this.pos = {x: Math.ceil(Math.random()*gridArea.size.width), y: Math.ceil(Math.random()*gridArea.size.height)};
        this.updatePosition();
    }

    async reset()
    {
        this.pos = {x: Math.ceil(Math.random()*gridArea.size.width), y: Math.ceil(Math.random()*gridArea.size.height)};
    }
}

class Main_menu
{
    navToGame()
    {
        play.addEventListener(("click"), async () =>
        {
            await snake.reset();
            await food.reset();
            display.gameArea();
        });
    }
}

class Second_menu
{
    navToGame()
    {
        replay.addEventListener(("click"), async () =>
        {
            await snake.reset();
            await food.reset();
            display.gameArea();
        });
    }

    navToMainMenu()
    {
        reMenu.addEventListener(("click"), () =>
        {
            display.start();
        });
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


const gridArea = new GridArea();

const snake = new Snake();

const food = new Food();

const main_menu = new Main_menu();
main_menu.navToGame();

const second_menu = new Second_menu();
second_menu.navToGame();
second_menu.navToMainMenu();