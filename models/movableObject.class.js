class MovableObject extends DrawableObject {

    speed;
    direction = 1;
    acceleration = 1;
    speedY;

    mustIdle = false;
    mustWalk = false;
    mustJump = false;
    isDead = false;
    isHurt = false;
    bottleThrown = false;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }

    isAboveGround(){
        if(this instanceof Character) {
            return this.y < 150;
        }

        if(this instanceof ThrowableObject) {
            return this.y < 390;
        }

        if(this instanceof Chicken) {
            return this.y < 700;
        }
    }

    moveObjects(speed) {
        this.x -= speed;
    }

    moveCharacter(speed) {
        this.x += speed * this.direction;
    }

    isColliding(object) {
        return this.x + this.width > object.x &&
        this.y + this.height > object.y &&
        this.x < object.x &&
        this.y < object.y + object.height;
    }

    
    checkCollisions() {
        setInterval(() => {
            this.collisionWithChicken();
            this.collectBottles();
            this.collectCoins();
        }, 100);
    }

    collisionWithChicken() {
        this.world.level.chicken.forEach((chicken) => {
            if (this.isColliding(chicken)) {
                if(this instanceof Character) {
                    this.hit();
                }
                if(this instanceof ThrowableObject) {
                    this.bottleHit();
                    chicken.kickedOut();
                }
            }
        })
    }
    
    collectBottles() {
        this.world.level.bottles.forEach((bottle) => {
            if(this.isColliding(bottle) && this instanceof Character) {
                this.world.bottleCounter.counter++;
                bottle.removeBottle();
            }
        })
    }

    collectCoins() {
        this.world.level.coins.forEach((coin) => {
            if(this.isColliding(coin) && this instanceof Character) {
                this.world.coinCounter.counter++;
                coin.removeCoin();                
            }
        })
    }
}