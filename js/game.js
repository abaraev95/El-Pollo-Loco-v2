let world;
let canvas;

init = () => {
    canvas = document.getElementById('canvas');
    //world = new World(canvas, level1);

}

startGame = () => {
    world = new World(canvas, level1);
    world.startGame();
}