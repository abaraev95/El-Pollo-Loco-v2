class Character extends MovableObject {

    x = 150;
    y = 150;
    height = 340;
    width = 170;
    world;

    health = 100;


    IMAGES_IDLE = [
        'img/Pepe/idle/I-1.png', 'img/Pepe/idle/I-2.png', 'img/Pepe/idle/I-3.png', 'img/Pepe/idle/I-4.png',
        'img/Pepe/idle/I-5.png', 'img/Pepe/idle/I-6.png', 'img/Pepe/idle/I-7.png', 'img/Pepe/idle/I-8.png',
        'img/Pepe/idle/I-9.png', 'img/Pepe/idle/I-10.png',

    ]

    IMAGES_WALKING = [
        'img/Pepe/walk/W-21.png', 'img/Pepe/walk/W-22.png', 'img/Pepe/walk/W-23.png', 'img/Pepe/walk/W-24.png',
        'img/Pepe/walk/W-25.png', 'img/Pepe/walk/W-26.png',
    ]

    IMAGES_JUMPING = [
        'img/Pepe/jump/J-31.png', 'img/Pepe/jump/J-32.png', 'img/Pepe/jump/J-33.png', 'img/Pepe/jump/J-34.png',
        'img/Pepe/jump/J-35.png', 'img/Pepe/jump/J-36.png', 'img/Pepe/jump/J-37.png', 'img/Pepe/jump/J-38.png',
        'img/Pepe/jump/J-39.png', 'img/Pepe/jump/J-40.png',
    ]

    IMAGES_HURTING = ['img/Pepe/hurt/H-41.png', 'img/Pepe/hurt/H-42.png', 'img/Pepe/hurt/H-43.png']

    constructor(world) {
        super();
        this.world = world;
        this.loadImage('img/Pepe/walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURTING);
        this.applyGravity();
        this.characterControl();
        this.characterAnimation();
        this.checkCollisions();
    }

    characterControl() {
        setInterval(() => {
            if (!this.world.keyboard.right && !this.world.keyboard.left && !this.world.keyboard.up) {
                this.mustIdle = true;
                this.mustWalk = false;
            }

            if (this.world.keyboard.right || this.world.keyboard.left) {
                if (this.world.keyboard.right) { this.direction = 1 }
                else { this.direction = -1 }
                this.mustIdle = false;
                this.mustWalk = true;
                this.walk();
            }

            if (this.world.keyboard.up && !this.isAboveGround()) {
                this.mustIdle = false;
                this.mustWalk = false;
                this.mustJump = true;
                this.jump();
            }

            if (this.isAboveGround()) {
                this.mustIdle = false;
                this.mustWalk = false;
                this.mustJump = true;
            } else { this.mustJump = false }

            if (this.world.keyboard.space) {
                this.throw();
            }

            this.cameraFocus();
        }, 1000 / 60);
    }

    characterAnimation() {
        setInterval(() => {
            if (this.isHurt) { this.playAnimation(this.IMAGES_HURTING) }
            else if (this.mustIdle) { this.playAnimation(this.IMAGES_IDLE) }
            else if (this.mustWalk) { this.playAnimation(this.IMAGES_WALKING) }
            else if (this.mustJump) { this.playAnimation(this.IMAGES_JUMPING) }
        }, 150);
    }

    walk() {
        if (this.x < 153) {
            this.x = 153;
        }


        if (this.x >= 153 && this.x < this.world.bossFight_x) {
            this.moveCharacter(3);
        }

        if (this.x >= this.world.bossFight_x) {
            this.x = this.world.bossFight_x - 1;
        }


    }

    jump() {
        this.currentImage = 3;
        this.speedY = 20;
    }

    hit() {
        if (!this.isHurt) {
            this.isHurt = true;
            this.health -= 10;
            this.world.healthbar.setHealth();
            console.log('lost Health:' + this.health);
            setTimeout(() => {
                this.isHurt = false;
            }, 1500);
        }
    }

    throw() {
        if (!this.bottleThrown && this.world.bottleCounter.counter > 0) {
            this.bottleThrown = true;
            this.world.throwableObjects.push(new ThrowableObject(this.x + 100, this.y + 100, this.world));
            this.world.bottleCounter.counter--;
            setTimeout(() => {
                this.bottleThrown = false;
            }, 500);
        }
    }

    cameraFocus() {
        this.world.camera_x = -this.x + 150;
    }

    checkCollisions() {
        this.collisionTimer = setInterval(() => {
            this.collisionWithChicken();
            this.collisionWithBoss();
            this.collisionWithLittleChicken();
            this.collectBottles();
            this.collectCoins();
            this.collectHealth();
        }, 1000 / 60);
    }

    collisionWithChicken() {
        this.world.level.chicken.forEach((chicken) => {
            if (this.isColliding(chicken) && !chicken.isDead && !this.isAboveGround()) {
                this.hit();
            }

            if (this.jumpsOnTop(chicken) && this.speedY < 0) {
                chicken.isDead = true;
            }
        })

    }

    collisionWithBoss() {
        this.world.level.boss.forEach((boss) => {
            if (this.isColliding(boss) && !boss.isDead && !this.isAboveGround()) {
                this.hit();
            }
        })
    }

    collisionWithLittleChicken() {
        this.world.spawnedChicks.forEach((chick) => {
            if (this.isColliding(chick) && !chick.isDead && !this.isAboveGround()) {
                this.hit();
            }

            if (this.jumpsOnTop(chick) && this.speedY < 0) {
                chick.isDead = true;
            }
        })
    }

    collectBottles() {
        this.world.level.bottles.forEach((bottle) => {
            if (this.isColliding(bottle)) {
                this.world.bottleCounter.counter++;
                bottle.removeBottle();
            }
        })
    }

    collectCoins() {
        this.world.level.coins.forEach((coin) => {
            if (this.isColliding(coin)) {
                this.world.coinCounter.counter++;
                coin.removeCoin();
            }
        })
    }

    collectHealth() {
        this.world.level.health.forEach((health) => {
            if (this.isColliding(health)) {
                if (this.health <= 90) {
                    this.health += 10;
                    health.removeHealth();
                    this.world.healthbar.setHealth();
                }
            }
        })
    }


}