class Endboss extends MovableObject {

    height = 350;
    width = 300;
    y = 150;
    mustAttack = false;

    world;
    bossIsFinished = false;

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
    }

    animate() {
        this.animationTimer = setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.IMAGES_DEAD);
                this.gotKilled();
            }
            else if (this.isHurt) { this.playAnimation(this.IMAGES_HURT) }
            else if (this.mustWalk) { this.playAnimation(this.IMAGES_WALKING) }
            else if (this.mustAttack) {
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

        this.movementTimer = setInterval(() => {
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
                        this.world.bossFight_x = 3000;
                    }
                    if (!this.world.bossHealthbar[0]) {
                        this.world.bossHealthbar.push(new BossHealthbar(this.world));
                    }

                    clearInterval(this.movementTimer);
                }
            }
        }, 1000 / 60);
    }

    gotHit() {
        if (!this.isHurt) {
            this.isHurt = true;
            this.mustAttack = false;
            this.world.bossHealthbar[0].health -= 20;
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
        if (!this.bossIsFinished) {
            this.bossIsFinished = true;
            setTimeout(() => {
                clearInterval(this.animationTimer);
                this.speedY = 6;
                this.applyGravity();
                this.removeBoss();
            }, 1000);
        }
    }

    removeBoss() {
        setTimeout(() => {
            this.world.bossHealthbar.splice(0, 1);
            let index = this.world.level.boss.indexOf(this);
            if (index == 0) {
                this.world.level.boss.push(new Endboss(3400, this.world));
                this.world.level.boss[1].startBoss();
            } else if (index == 1) {
                this.world.stopGame();
                document.getElementById('gameWon').classList.add('showResult');
                document.getElementById('restartButton').classList.add('showResult');
                document.getElementById('resumeButton').classList.add('d-none');
                document.getElementById('win-text').classList.remove('d-none');
            }
        }, 2000)
    }

    startBoss() {
        this.animate();
        this.walkingInPosition();
        this.checkCharacterPosition();
    }

    stopBoss() {
        clearInterval(this.animationTimer);
        clearInterval(this.movementTimer);
    }
}