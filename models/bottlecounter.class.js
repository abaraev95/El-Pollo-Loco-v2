class Bottlecounter extends DrawableObject {
    
    height = 60;
    width = 60;
    x = 20;
    y = 60;
    world;
    counter = 10;

    IMAGE_BOTTLE = 'img/Collectable-Objects/Bottle/Bottle.png';

    constructor(world) {
        super();
        this.world = world;
        this.loadImage(this.IMAGE_BOTTLE);
    }

    

}