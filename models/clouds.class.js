class Clouds extends MovableObject {

    y = 0;
    height = 300;
    width = 960;

    constructor(path, x){
        super().loadImage(path);
        this.x = x;
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.moveObjects(0.15);
        }, 1000 / 60)
    }
}