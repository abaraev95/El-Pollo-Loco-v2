class Healthbar extends DrawableObject {
    
    height = 60;
    width = 250;
    x = 30;
    y = -5;
    world;

    IMAGES_HEALTHBAR = [
        'img/Statusbars/Healthbar/0_ .png', 'img/Statusbars/Healthbar/20__1.png', 'img/Statusbars/Healthbar/40_ .png',
        'img/Statusbars/Healthbar/60_.png', 'img/Statusbars/Healthbar/80_.png', 'img/Statusbars/Healthbar/100_.png'
    ]

    constructor(world) {
        super();
        this.world = world;
        this.loadImages(this.IMAGES_HEALTHBAR);
        this.setHealth();
    }


    calcHealth() {
        if(this.world.character.health == 0) {
            return 0;
        }
        else if(this.world.character.health <= 20) {
            return 1;
        }
        else if(this.world.character.health <= 40) {
            return 2;
        }
        else if(this.world.character.health <= 60) {
            return 3;
        }
        else if(this.world.character.health <= 80) {
            return 4;
        }
        else if(this.world.character.health <= 100) {
            return 5;
        }
    }

    setHealth() {
        let path = this.IMAGES_HEALTHBAR[this.calcHealth()];
        this.img = this.imageCache[path];
    }
}