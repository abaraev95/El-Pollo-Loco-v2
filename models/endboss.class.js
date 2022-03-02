class Endboss extends MovableObject {

    height = 350;
    width = 300;
    y = 150;
    mustAttack = false;

    world;
    positioningTimer;
    bossAnimationTimer;

    IMAGES_WALKING = [
        'img/Boss/walk/G1.png', 'img/Boss/walk/G2.png', 'img/Boss/walk/G3.png', 'img/Boss/walk/G4.png',
    ]

    IMAGES_ATTACKING = [
        'img/Boss/attack/G13.png', 'img/Boss/attack/G14.png', 'img/Boss/attack/G15.png', 'img/Boss/attack/G16.png',
        'img/Boss/attack/G17.png', 'img/Boss/attack/G18.png', 'img/Boss/attack/G19.png', 'img/Boss/attack/G20.png',
    ]

    IMAGES_HURT = [
        'img/Boss/hurt/G21.png', 'img/Boss/hurt/G22.png', 'img/Boss/hurt/G23.png',
    ]

    IMAGES_DEAD = [
        'img/Boss/dead/G24.png',
        'img/Boss/dead/G25.png',
        'img/Boss/dead/G26.png',
    ]

    constructor(x, world) {
        super();
        this.x = x;
        this.world = world;
        this.loadImage('img/Boss/walk/G1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.mustWalk = true;
        this.animate();
        this.checkCharacterPosition();
        this.walkingInPosition();
    }

    animate() {
        this.bossAnimationTimer = setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.IMAGES_DEAD);
                this.gotKilled();
                this.removeBoss();
            }
            else if (this.isHurt) { this.playAnimation(this.IMAGES_HURT) }
            else if (this.mustWalk) { this.playAnimation(this.IMAGES_WALKING) }
            else if (this.mustAttack) {
                //this.currentImage = 0;
                this.playAnimation(this.IMAGES_ATTACKING);
                this.spawnChicks();
            }
        }, 200);
    }

    checkCharacterPosition() {
        setInterval(() => {
            if (!this.spawnBoss) {
                if (this.world.character.x >= this.world.bossFight_x - 20) {
                    this.spawnBoss = true;
                }
            }

        }, 100);
    }

    walkingInPosition() {

        this.positioningTimer = setInterval(() => {
            if (this.spawnBoss) {
                if (this.x > this.world.bossFight_x + 500) {
                    this.moveObjects(1);
                } else {
                    let index = this.world.level.boss.indexOf(this);
                    this.mustWalk = false;
                    this.currentImage = 0;
                    this.mustAttack = true;
                    if (index == 0) {
                        this.world.bossFight_x = 2700;
                    } else if (index == 1) {
                        this.world.bossFight_x = 3400;
                    }
                    this.world.bossHealthbar.push(new BossHealthbar(this.world));
                    clearInterval(this.positioningTimer);
                }
            }
        }, 1000 / 60);
    }

    gotHit() {
        if (!this.isHurt) {
            this.isHurt = true;
            this.mustAttack = false;
            this.world.bossHealthbar[0].health -= 25;
            this.world.bossHealthbar[0].setEnemyHealth();
            if (this.world.bossHealthbar[0].health == 0) {
                this.isDead = true;
                this.currentImage = 0;
            } else {
                setTimeout(() => {
                    this.isHurt = false;
                    this.currentImage = 0;
                    this.mustAttack = true;
                }, 1000);
            }
        }
    }

    spawnChicks() {
        if (this.currentImage == 6) {
            this.world.spawnedChicks.push(new LittleChicken(this.x, this.world));
            setTimeout(() => {
                this.currentImage = 0;
            }, 400);
        }
    }

    gotKilled() {
        setTimeout(() => {
            this.speedY = 6;
            this.applyGravity();
        }, 1000);
    }

    removeBoss() {
        clearInterval(this.bossAnimationTimer);
        setTimeout(() => {
            this.world.bossHealthbar.splice(0, 1);
            let index = this.world.level.boss.indexOf(this);
            if (index == 0) {
                this.world.level.boss.push(new Endboss(3500, this.world));
            }
        }, 2000)

    }
}