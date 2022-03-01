class Chicken extends MovableObject {

    y = 380;
    height = 100;
    width = 100;
    world;

    IMAGES_WALKING = [
        'img/Chicken/W-1.png',
        'img/Chicken/W-2.png',
        'img/Chicken/W-3.png'
    ]

    IMAGE_DEAD = ['img/Chicken/D-1.png']

    constructor() {
        super();
        this.loadImage('img/Chicken/W-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.x = 600 + (Math.random() * 500);
        this.mustWalk = true;
        this.animate();
        this.startMoving();
    }

    animate() {
        setInterval(() => {
            if(this.mustWalk){
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 120);
    }

    startMoving() {
        setInterval(() => {
            if(this.mustWalk){
                this.moveObjects(1);    
            }
        }, 1000 / 60);
    }

    kickedOut() {
        this.mustWalk = false;
        this.applyGravity();
        this.speedY = 18;
        setInterval(() => {
            this.x += 7;
        }, 1000 / 60);
        setTimeout(() => {
            this.removeChicken()
        }, 2000);
    }

    removeChicken(){
        let i = this.world.level.chicken.indexOf(this);
        this.world.level.chicken.splice(i, 1);
    }


}