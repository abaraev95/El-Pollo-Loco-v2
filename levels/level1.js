const level1 = new Level(
    [
        new Chicken(500),
        new Chicken(800),
        new Chicken(950),
        new Chicken(1200),
        new Chicken(1500),
        new Chicken(1550),
        new Chicken(1800),
        new Chicken(2000),
        new Chicken(2100),
        new Chicken(2250),
        new Chicken(2300),
        new Chicken(2500)
    ],
    [
        new Endboss(2200),
    ],
    [
        new BackgroundObject('img/Background-Objects/Sky/sky.png', 0),
        new BackgroundObject('img/Background-Objects/Sky/sky.png', 959),
        new BackgroundObject('img/Background-Objects/Sky/sky.png', 1915),
        new BackgroundObject('img/Background-Objects/Sky/sky.png', 2870),
        new BackgroundObject('img/Background-Objects/Desert-3/1.png', 0),
        new BackgroundObject('img/Background-Objects/Desert-3/2.png', 960),
        new BackgroundObject('img/Background-Objects/Desert-3/1.png', 1920),
        new BackgroundObject('img/Background-Objects/Desert-3/2.png', 2880),
        new BackgroundObject('img/Background-Objects/Desert-2/1.png', 0),
        new BackgroundObject('img/Background-Objects/Desert-2/2.png', 960),
        new BackgroundObject('img/Background-Objects/Desert-2/1.png', 1920),
        new BackgroundObject('img/Background-Objects/Desert-2/2.png', 2880),
        new BackgroundObject('img/Background-Objects/Desert-1/1.png', 0),
        new BackgroundObject('img/Background-Objects/Desert-1/2.png', 960),
        new BackgroundObject('img/Background-Objects/Desert-1/1.png', 1920),
        new BackgroundObject('img/Background-Objects/Desert-1/2.png', 2880),
        new Clouds('img/Background-Objects/Clouds/1.png', 0),
        new Clouds('img/Background-Objects/Clouds/2.png', 960),
        new Clouds('img/Background-Objects/Clouds/1.png', 1920),
        new Clouds('img/Background-Objects/Clouds/2.png', 2880),
    ],
    [
        new CollectableObject('img/Collectable-Objects/Bottle/Bottle-stuck-1.png', 400, 400),
        new CollectableObject('img/Collectable-Objects/Bottle/Bottle-stuck-2.png', 700, 400),
        new CollectableObject('img/Collectable-Objects/Bottle/Bottle-stuck-1.png', 900, 400),
        new CollectableObject('img/Collectable-Objects/Bottle/Bottle-stuck-2.png', 1200, 400)
    ],
    [
        new CollectableObject('img/Collectable-Objects/Coin.png', 600, 350),
        new CollectableObject('img/Collectable-Objects/Coin.png', 700, 250)
    ],
    [
        new CollectableObject('img/Collectable-Objects/Health.png', 700, 250),
        new CollectableObject('img/Collectable-Objects/Health.png', 900, 150)
    ]
);
