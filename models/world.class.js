class World {

    character = new Character(this);
    keyboard = new Keyboard(this);
    healthbar = new Healthbar(this);
    bossHealthbar = [];
    spawnedChicks = [];
    bottleCounter = new Bottlecounter(this);
    coinCounter = new Coincounter(this);
    level;
    bossFight_x = 1500;
    canvas;
    ctx;
    camera_x;
    throwableObjects = [];


    constructor(canvas, level1) {
        this.canvas = canvas;
        this.level = level1;
        this.ctx = canvas.getContext('2d');
        this.drawWorld();
        this.setWorld();
    }

    drawWorld() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.drawArray(this.level.backgroundObjects);
        this.drawArray(this.level.bottles);
        this.drawArray(this.level.coins);
        this.drawArray(this.level.health);
        this.ctx.translate(-this.camera_x, 0);
        this.healthbar.drawObject(this.ctx);
        this.drawArray(this.bossHealthbar);
        this.bottleCounter.drawObject(this.ctx);
        this.drawNumber();
        this.coinCounter.drawObject(this.ctx);
        this.ctx.translate(this.camera_x, 0);
        this.drawArray(this.level.chicken);
        this.drawArray(this.level.boss);
        this.drawArray(this.spawnedChicks);
        this.drawArray(this.throwableObjects);
        this.drawCharacter();
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(this.drawWorld.bind(this));
    }

    drawArray(levelArray) {
        levelArray.forEach(object => {
            object.drawObject(this.ctx);
        })
    }

    drawCharacter() {
        if (this.character.direction == -1) {
            this.ctx.save();
            this.ctx.translate(this.character.width, 0);
            this.ctx.scale(-1, 1);
            this.character.x = this.character.x * -1;
        }
        this.character.drawObject(this.ctx);
        if (this.character.direction == -1) {
            this.ctx.restore();
            this.character.x = this.character.x * -1;
        }
    }

    drawNumber() {
        this.ctx.font = '25px Rye';
        this.ctx.fillText('x ' + this.bottleCounter.counter, 80, 105);
        this.ctx.fillText('x ' + this.coinCounter.counter, 80, 155);
    }

    setWorld(){
        
        this.level.boss.forEach((boss) => {
            boss.world = this;
        })

        this.level.chicken.forEach((chicken) => {
            chicken.world = this;
        })

        this.level.bottles.forEach((bottle) => {
            bottle.world = this;
        })
        this.level.coins.forEach((coin) => {
            coin.world = this;
        })

        this.level.health.forEach((health) => {
            health.world = this;
        })
    }

}