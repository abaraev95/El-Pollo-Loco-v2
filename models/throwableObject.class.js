class ThrowableObject extends MovableObject {

    height = 90;
    width = 90;
    world;

    splashTimer;

    bottleThrown = true;
    objectHit = false;
    stopSplash = false;

    IMAGES_BOTTLE = [
        'img/Collectable-Objects/Bottle/throw/throw-animation-1.png', 'img/Collectable-Objects/Bottle/throw/throw-animation-2.png',
        'img/Collectable-Objects/Bottle/throw/throw-animation-3.png', 'img/Collectable-Objects/Bottle/throw/throw-animation-4.png'
    ]

    IMAGES_SPLASH = [
        'img/Collectable-Objects/Bottle/splash/splash-animation-1.png', 'img/Collectable-Objects/Bottle/splash/splash-animation-2.png',
        'img/Collectable-Objects/Bottle/splash/splash-animation-3.png', 'img/Collectable-Objects/Bottle/splash/splash-animation-4.png',
    ]

    constructor(x, y, world) {
        super();
        this.world = world;
        this.loadImage('img/Collectable-Objects/Bottle/throw/throw-animation-1.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.currentImage = 1;
        this.applyGravity();
        this.flyingBottle();
        this.bottleAnimation();
        this.checkCollisions();
    }

    flyingBottle() {
        this.speedY = 13;
        setInterval(() => {
            this.x += 11;
            if (this.objectHit || !this.isAboveGround()) {
                this.x -= 11;
            }
        }, 1000 / 60);
    }

    bottleAnimation() {
        setInterval(() => {
            if (this.bottleThrown && this.isAboveGround()) { this.playAnimation(this.IMAGES_BOTTLE) }
            else if (this.objectHit || !this.isAboveGround()) {
                this.playAnimation(this.IMAGES_SPLASH);
                this.stopSplash = true;
            }
        }, 150);
        
        this.splashTimer = setInterval(() => {
            this.stopSplashAnimation();
        }, 1000 / 60);
    }

    bottleHit() {
        if (!this.objectHit) {
            this.bottleThrown = false;
            this.objectHit = true;
            console.log('Chicken dead');
            setTimeout(() => {
                this.objectHit = false;
            }, 500);
        }
    }

    removeBottle() {
        let i = this.world.throwableObjects.indexOf(this);
        this.world.throwableObjects.splice(i, 1);
    }

    stopSplashAnimation() {
        if (this.stopSplash) {
            this.stopSplash = false;
            clearInterval(this.splashTimer);
            setTimeout(() => {
                this.removeBottle();
            }, 500);
        }
    }
    
}

