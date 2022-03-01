class World {

    character = new Character(this);
    keyboard = new Keyboard(this);
    level;
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
        this.drawArray(this.level.chicken);
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

    setWorld(){
        this.level.chicken.forEach((chicken) => {
            chicken.world = this;
        })
    }



}