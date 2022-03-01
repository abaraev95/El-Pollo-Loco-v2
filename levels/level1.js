const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken()
    ],/*
    [
        new Boss()
    ],*/
    [
        new BackgroundObject('img/Background-Objects/Sky/sky.png', 0),
        new BackgroundObject('img/Background-Objects/Sky/sky.png', 959),
        new BackgroundObject('img/Background-Objects/Desert-3/1.png', 0),
        new BackgroundObject('img/Background-Objects/Desert-3/2.png', 960),
        new BackgroundObject('img/Background-Objects/Desert-2/1.png', 0),
        new BackgroundObject('img/Background-Objects/Desert-2/2.png', 960),
        new BackgroundObject('img/Background-Objects/Desert-1/1.png', 0),
        new BackgroundObject('img/Background-Objects/Desert-1/2.png', 960),
        new Clouds('img/Background-Objects/Clouds/1.png', 0),
        new Clouds('img/Background-Objects/Clouds/2.png', 960),
    ]/*,
    [
        new Coins()
    ],
    [
        new Bottles()
    ],
    [
        new Health()
    ]*/
);