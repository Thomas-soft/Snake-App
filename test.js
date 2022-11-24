class Snake
{
    constructor()
    {
        this.velocity = {x: 1, y: 1};
        this.dataPos =
        [
            {x: 0, y: 0}
        ];
        this.headPos = {x: this.dataPos[0].x, y: this.dataPos[0].y};
    }

    updatePosition()
    {
        // this.headPos = this.dataPos[0];
        this.headPos.x += this.velocity.x;
        this.headPos.y += this.velocity.y;

        this.dataPos.push({x: this.headPos.x, y: this.headPos.y});
        if (this.dataPos.length > 3)
            this.dataPos.shift();

        console.log(...this.dataPos);
    }
}

const snake = new Snake();

let interval = setInterval(() =>
{
    snake.updatePosition();
}, 500);

window.addEventListener("keydown", (e) =>
{
    if (e.key == "Escape")
        clearInterval(interval);
});